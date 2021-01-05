const emojis = require('../../emojis');
const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, data) => {
	let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    if(user.id == message.author.id) return message.channel.send(`⚠️ Vous ne pouvez pas vous expulser vous même ${emojis.facepalm}`);

    const reason = (args.slice(1).join(" ") || "Pas de raison spécifiée");

    const member = message.guild.member(user);

    const memberPosition = member.roles.highest.position;
    const moderatorPosition = message.guild.member(message.author).roles.highest.position;
    if(message.guild.ownerID !== message.author.id) {
        if(moderatorPosition <= memberPosition) return message.channel.send(`⚠️ Vous ne pouvez pas expulser ce membre.`);
    }

    if(!member.kickable) return message.channel.send(`⚠️ Je n'ai pas les permissions suffisantes pour expulser ce membre, vérifiez que mon rôle est au dessus du membre à kick, et réessayez.`);

    message.guild.member(user).kick(reason).catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    })

    message.channel.send(`✅ ${user} s'est fait expulser par ${message.author} pour la raison suivante: **${reason}**`);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setDescription(`L'utilisateur **${user.username}** s'est fait expulser par ${message.author}. \nRaison: **${reason}**`)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

module.exports.help = {
    name: "kick",
    aliases: ["kick", "expel"],
    category: "Moderation",
    description: "Expulser un membre",
    usage: "<membre> [raison]",
    cooldown: 5,
    memberPerms: ["KICK_MEMBERS"],
    botPerms: ["KICK_MEMBERS"],
    args: true
}