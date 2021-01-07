const { MessageEmbed } = require("discord.js");

module.exports = async (client, oldMember, newMember) => {
    
    /* 
     * Système d'antigiverole
     */

    const data = await client.getGuild(newMember.guild);
    if(!data) return;

    if(data.plugins.protection.antigiverole === true) {    
        if(oldMember.roles.cache.size < newMember.roles.cache.size) {
            if(newMember.guild.me.hasPermission("VIEW_AUDIT_LOG")) {
                const fetchGuildAuditLogs = await newMember.guild.fetchAuditLogs({
                    limit: 1,
                    type: 'MEMBER_ROLE_UPDATE'
                })
            
                const { executor } = fetchGuildAuditLogs.entries.first();

                if(executor.id === newMember.guild.ownerID || executor.id === newMember.id || newMember.id === newMember.guild.ownerID) return;

                const oldAdminroles = oldMember.roles.cache.filter(r => r.id !== oldMember.guild.roles.everyone.id).filter(role => role.permissions.toArray().includes('ADMINISTRATOR') || role.permissions.toArray().includes('BAN_MEMBERS') || role.permissions.toArray().includes('KICK_MEMBERS'));

                const newAdminRoles = newMember.roles.cache.filter(r => r.id !== newMember.guild.roles.everyone.id).filter(role => role.permissions.toArray().includes('ADMINISTRATOR') || role.permissions.toArray().includes('BAN_MEMBERS') || role.permissions.toArray().includes('KICK_MEMBERS'));

                if(newAdminRoles.map(r => r.name).length > oldAdminroles.map(r => r.name).length) {
                    newAdminRoles.forEach(async r => {
                        if(!oldAdminroles.map(r => r.id).includes(r.id)) {
                            if(r.position >= newMember.guild.me.roles.highest.position) {
                                if(data.plugins.logs.enabled && data.plugins.logs.channel) {
                                    return newMember.guild.channels.cache.get(data.plugins.logs.channel).send('L\'antigiverole est activé et un utilisateur a donné un rôle de modérateur/administrateur a un autre, mais je n\'ai pas pu lui enlever car le rôle est placé au dessus de moi!');
                                }
                            } else {
                                await newMember.roles.remove(r.id);

                                if(data.plugins.logs.enabled && data.plugins.logs.channel) {
                                    const embed = new MessageEmbed()
                                        .setColor('RED')
                                        .setAuthor(`${executor.username} a tenté de rajouter un rôle de modération a un utilisateur.`)
                                        .addField('Rôle', r, true)
                                        .addField('Utilisateur', newMember.user.tag, true)
                                        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
                                    newMember.guild.channels.cache.get(data.plugins.logs.channel).send(embed)
                                }
                            }
                        }
                    })
                }
            }
        }
    }
}
