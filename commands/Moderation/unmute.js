const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, data) => {
	const user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));
    const muteRole = message.guild.roles.cache.find(r => r.id == data.muterole);
    const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');

    if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Utilisateur introuvable.');

    const member = message.guild.member(user);

    if(!member.roles.cache.has(muteRole.id)) return message.channel.send('⚠️ Ce membre n\'est pas muet!');

    if(muteRole.position >= message.guild.me.roles.highest.position) return message.channel.send(`⚠️ Impossible de unmute ce membre, le rôle \`${muteRole}\` est plus haut que mon rôle le plus haut!`);

    await member.roles.remove(muteRole.id).catch(err => {
        console.log(err);
        message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    });

    message.channel.send(`✅ ${user} s'est fait unmute par ${message.author} pour la raison suivante: **${reason}**`);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setDescription(`L'utilisateur **${user.username}** s'est fait unmute par ${message.author}. \nRaison: **${reason}**`)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

module.exports.help = {
    name: "unmute",
    aliases: ["unmute"],
    category: "Moderation",
    description: "Rendre la voix à membre",
    usage: "<membre> [raison]",
    cooldown: 5,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGE_ROLES"],
    args: true
}