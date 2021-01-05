const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const emojis = require('../../emojis');

module.exports.run = (client, message, args, data) => {
    message.channel.send('Cette commande n\'est pas disponible pour le moment. Pour être au courant des nouveautés du bot, rendez-vous sur notre support via la commande `' + data.prefix + 'support`.');
	// let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    // if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    // if(user.id === message.author.id) return message.channel.send(`⚠️ Vous ne pouvez pas vous mute vous même ${emojis.facepalm}`);

    // const reason = (args.slice(2).join(" ") || "Pas de raison spécifiée");

    // const time = args[1];
    // if(!time || isNaN(ms(time)) || ms(time) < 5000 || ms(time) > 2160000000) return message.channel.send('⚠️ Temps invalide, le temps doit être entre 5s et 25 jours.');

    // const member = message.guild.member(user);

    // const memberPosition = member.roles.highest.position;
    // const moderatorPosition = message.guild.member(message.author).roles.highest.position;
    // if(message.guild.ownerID !== message.author.id) {
    //     if(moderatorPosition <= memberPosition) return message.channel.send(`⚠️ Vous ne pouvez pas mute une personne plus haute que vous.`);
    // }

    // let muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() == "muted" || r.name.toLowerCase() == "muet");
    // if(!muteRole) {
    //         await message.guild.roles.create({
    //         data: {
    //             name: "Muted",
    //             color: "#000000",
    //             permissions: [],
    //             position: message.member.roles.highest.position - 1,
    //             mentionnable: false
    //         }
    //     })
    //     await client.updateGuild(message.guild, { muterole: muteRole.id });
    // }

    // message.guild.channels.cache.forEach(async channel => {
    //     if(!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) return;
    //     await channel.updateOverwrite(muteRole, {
    //       SEND_MESSAGES: false,
    //       ADD_REACTIONS: false,
    //       CONNECT: false,
    //     });
    // });

    // await member.roles.add(muteRole.id).catch(err => {
    //     console.log(err);
    //     message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    // });

    // message.channel.send(`✅ ${user} s'est fait mute par ${message.author} pour la raison suivante: **${reason}**`);

    // if(data.plugins.logs.enabled) {
    //     if(data.plugins.logs.channel) {
    //         const embed = new MessageEmbed()
    //             .setColor('ORANGE')
    //             .setDescription(`L'utilisateur **${user.username}** s'est fait mute par ${message.author}. \nRaison: **${reason}**`)
    //             .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
    //         message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
    //     }
    // }
}

module.exports.help = {
    name: "tempmute",
    aliases: ["tempmute"],
    category: "Moderation",
    description: "Rendre temporairement muet un membre",
    usage: "<membre> <temps> [raison]",
    cooldown: 5,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGE_ROLES"],
    args: false
}