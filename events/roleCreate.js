const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async (client, role) => {
    const data = await client.getGuild(role.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!role.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await role.guild.fetchAuditLogs({
                limit: 1,
                type: 'ROLE_CREATE'
            })
            let latestRoleDeleted = fetchGuildAuditLogs.entries.first()
            const { executor } = latestRoleDeleted;

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${executor.username} a créé un nouveau rôle`, executor.displayAvatarURL({ dynamic: true }))
                .addField('Nom', role.name, true)
                .addField('Couleur', role.hexColor, true)
                .addField('Mentionnable', role.mentionable ? "Oui" : "Non", true)
                .setFooter('ID: ' + role.id)
                .setTimestamp();
            role.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}