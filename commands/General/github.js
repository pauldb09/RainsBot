const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`Clique [ici](https://github.com/COCO150/RainsBot) pour voir le GitHub du bot !`)
    message.channel.send(embed);
}

module.exports.help = {
    name: "github",
    aliases: ["github"],
    category: "General",
    description: "Envoie un lien vers le GitHub du bot",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}