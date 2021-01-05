const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`Clique [ici](https://discord.gg/SSWQamBCFE) pour rejoindre le serveur de support !`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "support",
    aliases: ["support", "discord"],
    category: "General",
    description: "Envoie un lien pour rejoindre le serveur de support !",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}