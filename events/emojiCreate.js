const { MessageEmbed } = require("discord.js");

module.exports = async (client, emoji) => {
    const data = await client.getGuild(emoji.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!emoji.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await emoji.guild.fetchAuditLogs({
                limit: 1,
                type: 'EMOJI_CREATE'
            })

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${fetchGuildAuditLogs.entries.first().executor.username} a créé un nouvel emoji !`, emoji.url)
                .addField('Nom', emoji.name, true)
                .addField('Animé', emoji.animated ? "Oui" : "Non", true)
                .addField('Lien', emoji.url)
                .setFooter('ID: ' + emoji.id)
                .setTimestamp();
            emoji.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}