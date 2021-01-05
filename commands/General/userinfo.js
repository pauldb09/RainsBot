const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const emojis = require('../../emojis');

module.exports.run = async (client, message, args) => {
	let user;

	if(!args.length) {
		user = message.author;
	} else {
		user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));
	};

	if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    const member = message.guild.member(user);

    let clientStatus = user.presence.clientStatus;

    if(clientStatus === null) clientStatus = 'Inconnu';
    else if(clientStatus.desktop) clientStatus = 'Ordinateur';
    else if(clientStatus.web) clientStatus = 'Web';
    else if(clientStatus.mobile) clientStatus = 'Téléphone';
    else clientStatus = "Inconnu";

    const roles = member.roles.cache.sort((a, b) => b.position - a.position).filter(role => role.id !== message.guild.roles.everyone.id).map(role => role.toString());
    const reste = roles.splice(0, 29).join(", ");

    let userStatus = user.presence.status;
    switch (userStatus) {
      	case "online": {
        	userStatus = `${emojis.online} En ligne`;
        	break;
      	};
      	case "offline": {
        	userStatus = `${emojis.offline} Hors-ligne`;
        	break;
      	};
      	case "idle": {
        	userStatus = `${emojis.idle} Inactif`;
        	break;
      	};
      	case "dnd": {
        	userStatus = `${emojis.dnd} Ne pas déranger`;
        	break;
      	};
    };

    const userInfoEmbed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(user.tag, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: "👨 Nom d'utilisateur", value: user.username, inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: "🤖 Bot ?", value: user.bot ? "Oui" : "Non", inline: true },
            { name: "🖥️ Client", value: clientStatus, inline: true },
            { name: "⌨️ Activité", value: user.presence.activities[0] ? user.presence.activities[0].name : "Aucune", inline: true },
            { name: "Status", value: userStatus, inline: true },
            { name: "🆕 Compte créé", value: moment(user.createdAt).locale('fr').format('llll'), inline: true },
            { name: "📥 Rejoint le", value: moment(member.joinedAt).locale('fr').format('llll'), inline: true },
        )
        .setFooter(`ID: ${user.id}`);

    if(member.roles.cache.size > 1) userInfoEmbed.addField("🎭 Rôles", reste);

    if(userInfoEmbed.fields[8]) {
        if(userInfoEmbed.fields[8].value.length > 300) {
            userInfoEmbed.fields[8].value = reste.substr(0, 310) + " et plus...";
        }
    }

    message.channel.send(userInfoEmbed);
}

module.exports.help = {
    name: "userinfo",
    aliases: ["userinfo", "ui", "userinfos", "infouser", "infosuser", "user-info", "user-infos", "info-user", "infos-user"],
    category: "General",
    description: "Afficher des informations sur un membre ou vous même",
    usage: "[membre]",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}