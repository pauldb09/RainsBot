const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel) => {
    if(channel.type == "dm") return;

    const data = await client.getGuild(channel.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!channel.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            let cType = channel.type;
            switch (cType) {
                case "text": cType = "Textuel"; break;
                case "voice": cType = "Vocal"; break;
                case "category": cType = "Catégorie"; break;
                case "news": cType = "Annonce"; break;
                case "store": cType = "Magasin"; break;
            }

            const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_CREATE'
            })

            const latestChannelCreated = fetchGuildAuditLogs.entries.first();
            const { executor } = latestChannelCreated;

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${executor.username} a créé un nouveau salon`, executor.displayAvatarURL({ dynamic: true }))
                .addField('Nom', channel.name, true)
                .addField('Type', cType, true)
                .setFooter('ID: ' + channel.id)
                .setTimestamp();
            channel.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}