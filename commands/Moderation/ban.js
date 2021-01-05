const emojis = require('../../emojis');

module.exports.run = async (client, message, args, data) => {
	let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    if(user.id == message.author.id) return message.channel.send(`⚠️ Vous ne pouvez pas vous bannir vous même ${emojis.facepalm}`);

    const reason = (args.slice(1).join(" ") || "Pas de raison spécifiée");

    const member = message.guild.member(user);

    const memberPosition = member.roles.highest.position;
    const moderatorPosition = message.guild.member(message.author).roles.highest.position;
    if(message.guild.ownerID !== message.author.id) {
        if(moderatorPosition <= memberPosition) return message.channel.send(`⚠️ Vous ne pouvez pas bannir ce membre.`);   
    }

    if(!member.bannable) return message.channel.send(`⚠️ Je n'ai pas les permissions suffisantes pour bannir ce membre, vérifiez que mon rôle est au dessus du membre à bannir, et réessayez.`);

    message.guild.member(user).ban({ reason: reason }).catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    })

    message.channel.send(`✅ ${user} s'est fait bannir par ${message.author} pour la raison suivante: **${reason}**`);
}

module.exports.help = {
    name: "ban",
    aliases: ["ban"],
    category: "Moderation",
    description: "Bannir un membre",
    usage: "<membre> [raison]",
    cooldown: 5,
    memberPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    args: true
}