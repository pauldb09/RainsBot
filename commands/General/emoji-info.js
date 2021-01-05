const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const emojis = require("../../emojis");
const emoji = require('../../emojis');

module.exports.run = (client, message, args) => {
    if(message.content.split(':')[2] === undefined) return message.channel.send('⚠️ Cet emoji n\'est pas un emoji valide.');

    const emojiID = message.content.split(':')[2].replace(">", "");
    if(!emojiID) return message.channel.send('⚠️ Cet emoji n\'est pas un emoji valide.');

    const emoji = message.guild.emojis.cache.get(emojiID);
    if(emoji === undefined || !emoji.available || emoji.deleted) return message.channel.send('⚠️ Impossible de trouver cet emoji dans ce serveur.');

    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(emoji.name, emoji.url)
        .addFields(
            { name: "🏷️ Nom", value: emoji.name + "\n\u200b", inline: true },
            { name: "🆕 Créé le", value: moment(emoji.createdAt).locale('fr').format('llll'), inline: true },
            { name: emojis.chargement + " Animé ?", value: emoji.animated ? "Oui" : "Non", inline: true },
            { name: "🔗 Lien de l'emoji", value: emoji.url, inline: true },
        )
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
    message.channel.send(embed);
}

module.exports.help = {
    name: "emoji-info",
    aliases: ["emoji-info", "ei", "emojiinfos", "infoemoji", "infosemoji", "emojiinfo", "emoji-infos", "emoji", "emojis", "emojisinfo", "emojisinfos", "emote", "emotes", "emoteinfo", "emote-info", "emote-info", "emotes-info", "emotes-infos"],
    category: "General",
    description: "Afficher des informations sur un emoji",
    usage: "<emoji>",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: true
}