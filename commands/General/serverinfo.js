const { MessageEmbed } = require("discord.js");
const emojis = require('../../emojis');
const moment = require('moment');

module.exports.run = (client, message) => {
    if(!message.guild.available) return;

    let guild = message.guild;

    let guildNotifications = guild.defaultMessageNotifications;

    if(guildNotifications == "ALL") guildNotifications = 'Toutes les messages';
    if(guildNotifications == "MENTIONS") guildNotifications = 'Mentions uniquement';

    let guildVerificationLevel = guild.verificationLevel;
    switch (guildVerificationLevel) {
        case "NONE": {
            guildVerificationLevel = 'Aucune restriction';
            break;
        };
        case "LOW": {
            guildVerificationLevel = 'Faible - Doit avoir une adresse e-mail vérifiée sur son compte Discord.';
            break;
        };
        case "MEDIUM": {
            guildVerificationLevel = 'Moyen - Doit aussi être inscrit sur Discord depuis plus de 5 minutes.';
            break;
        };
        case "HIGH": {
            guildVerificationLevel = 'Élevé - Doit aussi être un membre de ce serveur depuis plus de 10 minutes.';
            break;
        };
        case "VERY_HIGH": {
            guildVerificationLevel = 'Maximum - Doit avoir un numéro de téléphone vérifié sur son compte Discord.';
            break;
        };
    };

    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .addFields(
            { name: "🏷️ Nom", value: guild.name, inline: true },
            { name: "👑 Propriétaire", value: guild.members.cache.find(u => u.user.id === guild.ownerID).user.tag, inline: true },
            { name: "🆕 Créé le", value: moment(guild.createdAt).locale("fr").format("llll"), inline: true },
            { name: "👨 Membres", value: guild.members.cache.filter(m => !m.user.bot).size + " Humains | " + guild.members.cache.filter(m => m.user.bot).size + " Bots \n\u200b", inline: true },
            { name: "💬 Salons", value: guild.channels.cache.filter(ch => ch.type === "text").size + " " + emojis.textChannel + " | " + guild.channels.cache.filter(ch => ch.type === "voice").size + " " + emojis.voiceChannel, inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: emojis.boost + " Boosts", value: guild.premiumSubscriptionCount + " boosts (Tier " + guild.premiumTier + ")", inline: true },
            { name: "🔇 Salon AFK", value: guild.afkChannel ? guild.afkChannel : "Aucun", inline: true },
            { name: "🚩 Région", value: guild.region.charAt(0).toUpperCase() + guild.region.substr(1).toLowerCase(), inline: true },
            { name: emojis.partner + " Partenaire", value: guild.partnered ? "Oui" : "Non", inline: true },
            { name: "🔔 Notifications", value: guildNotifications, inline: true },
            { name: "🔐 Niveau de vérification", value: guildVerificationLevel, inline: true },
        )
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())

        if(guild.description) embed.setDescription(guild.description);
        if(guild.bannerURL()) embed.setImage(guild.bannerURL({ format: "png", size: 512 }));

    message.channel.send(embed);
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["serverinfo", "si", "serverinfos", "infoserver", "infosserver", "server-info", "server-infos", "info-server", "infos-server", "serveurinfo", "serveurinfos", "infoserveur", "infosserveur", "serveur-info", "serveur-infos"],
    category: "General",
    description: "Voir des informations sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}