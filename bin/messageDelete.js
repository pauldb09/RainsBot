const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    const data = await client.getGuild(message.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: "MESSAGE_DELETE"
            })

            const latestMessageDeleted = fetchGuildAuditLogs.entries.first();
            const { executor } = latestMessageDeleted

            if(executor.id == message.author.id || executor.bot || message.author.bot) return;

            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`${executor.username} a supprimé un message de ${message.author}`)
                .addField('Message supprimé', message.content ? message.content : "Impossible d'afficher le message")
                .addField('Salon', message.channel)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}