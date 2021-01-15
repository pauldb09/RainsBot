const { MessageEmbed } = require('discord.js');
const emojis = require('../../emojis');

module.exports.run = async (client, message, args, data) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    if(user.id === message.author.id) return message.channel.send(`⚠️ Vous ne pouvez pas vous mute vous même ${emojis.facepalm}`);

    const reason = (args.slice(1).join(" ") || "Pas de raison spécifiée");

    const member = message.guild.member(user);

    if(member.hasPermission('ADMINISTRATOR')) return message.channel.send('⚠️ Vous ne pouvez pas mute un administrateur !');
    const memberPosition = member.roles.highest.position;
    const moderatorPosition = message.guild.member(message.author).roles.highest.position;
    if(message.guild.ownerID !== message.author.id) {
        if(moderatorPosition <= memberPosition) return message.channel.send(`⚠️ Vous ne pouvez pas mute une personne plus haute que vous.`);
    }

    let muteRole = data.muterole;
    if(!message.guild.roles.cache.get(muteRole)) {
        const roles = await message.guild.roles.fetch()
        if(roles.cache.size === 250) return message.channel.send('⚠️ Votre serveur a dépassé la limite de **250 rôles**, impossible de rendre muet ce membre.');

        await message.guild.roles.create({
            data: {
                name: "Muted",
                color: "#000000",
                permissions: [],
                position: message.member.roles.highest.position - 1,
                mentionnable: false
            }
        }).then(async role => {
            await client.updateGuild(message.guild, { muterole: role.id });

            message.guild.channels.cache.forEach(channel => {
                if(!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) return;
                channel.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false,
                })
            })

            await member.roles.add(role).then(() => {
                message.channel.send(`✅ ${user} s'est fait mute par ${message.author} pour la raison suivante: **${reason}**`);
            }).catch(err => {
                console.log(err);
                message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
            })
        })
    } else {
        message.guild.channels.cache.forEach(channel => {
            if(!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) return;
            if(!channel.permissionsFor(muteRole).has('SEND_MESSAGES')) return;
            channel.updateOverwrite(message.guild.roles.cache.get(muteRole), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false,
            })
        })

        await member.roles.add(muteRole).then(() => {
            message.channel.send(`✅ ${user} s'est fait mute par ${message.author} pour la raison suivante: **${reason}**`);
        }).catch(err => {
            console.log(err);
            message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
        })
    }

    if(data.plugins.logs.enabled) {
        if(message.guild.channels.cache.get(data.plugins.logs.channel)) {
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setDescription(`L'utilisateur **${user.username}** s'est fait mute par ${message.author}. \nRaison: **${reason}**`)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

module.exports.help = {
    name: "mute",
    aliases: ["mute"],
    category: "Moderation",
    description: "Rendre muet un membre",
    usage: "<membre> [raison]",
    cooldown: 5,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    args: true
}
