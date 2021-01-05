const { MessageEmbed } = require('discord.js');
const emojis = require('../../emojis');
const Guild = require('../../models/Guild');

module.exports.run = async (client, message) => {
    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .addFields(
            { name: "Latence messages", value: emojis.chargement },
            { name: "Latence API", value: emojis.chargement },
            { name: "Base de données", value: emojis.chargement },
        )
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());

    message.channel.send(embed).then(async m => {
        const date = Date.now();

        await Guild.findOne({ id: message.guild.id });
        const bddPing = `${Date.now() - date}ms`;

        const APIPing = `${client.ws.ping}ms`;

        const messagesPing = `${m.createdTimestamp - message.createdTimestamp}ms`;
        if(messagesPing >= 500) { client.channels.cache.get(client.config.support.logs).send(`⚠️ **La latence du bot est élevée (${ping}ms)**`) };

        const newEmbed = new MessageEmbed()
            .setColor(client.config.embed.color)
            .addFields(
                { name: "Latence messages", value: messagesPing },
                { name: "Latence API", value: APIPing },
                { name: "Base de données", value: bddPing },
            )
            .setFooter(client.config.embed.footer, client.user.displayAvatarURL());

        m.edit(newEmbed);
    })
}

module.exports.help = {
    name: "ping",
    aliases: ["ping"],
    category: "General",
    description: "Vérifier la latence du bot",
    usage: "",
    cooldown: 10,
    memberPerms: [],
    botPerms: [],
    args: false
}