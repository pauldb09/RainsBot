const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    const data = await client.getGuild(guild);

    if(!guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    })

    const { executor } = fetchGuildAuditLogs.entries.first();

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            let description = `L'utilisateur **${user.username}** s'est fait bannir par ${executor}`;
            if(fetchGuildAuditLogs.entries.first().reason) description = description += `\nRaison: **${fetchGuildAuditLogs.entries.first().reason}**`

            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setDescription(description)
                .setFooter('ID: ' + user.id)
                .setTimestamp();
            guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}
