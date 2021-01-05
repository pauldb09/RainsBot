const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`Clique [ici](https://discord.com/oauth2/authorize?client_id=781911855299035217&scope=bot&permissions=2147483647) pour inviter le bot à ton serveur !`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "invite",
    aliases: ["invite"],
    category: "General",
    description: "Envoie un lien pour inviter le bot sur son serveur !",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}