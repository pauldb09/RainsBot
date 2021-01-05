const { MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = async (client, role) => {
    const data = await client.getGuild(role.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!role.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await role.guild.fetchAuditLogs({
                limit: 1,
                type: 'ROLE_DELETE'
            })
            let latestRoleCreated = fetchGuildAuditLogs.entries.first()
            const { executor } = latestRoleCreated;

            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`${executor.username} a supprimé un rôle`, executor.displayAvatarURL({ dynamic: true }))
                .addField('Nom', role.name, true)
                .addField('Couleur', role.hexColor, true)
                .addField('Créé le', moment(role.createdAt).locale('fr').format('lll'), true)
                .setFooter('ID: ' + role.id)
                .setTimestamp();
            role.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}