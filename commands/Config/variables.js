const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('Voici les variables disponibles que vous pouvez utiliser sur le message de bienvenue et d\'aurevoir : \n\n**{user}** ➔ Mentionner le membre \n**{username}** ➔ Nom d\'utilisateur du membre \n**{usertag}** ➔ Tag (nom d\'utilisateur + discriminateur) du membre \n**{guildName}** ➔ Nom du serveur \n**{memberCount}** ➔ Nombre de membres sur le serveur')
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
    message.channel.send(embed);
}

module.exports.help = {
    name: "variables",
    aliases: ["variables", "variable", "var", "vars"],
    category: 'Config',
    description: "Voir les variables disponibles pour le message de bienvenue et d'aurevoir",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}