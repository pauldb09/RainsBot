const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, data) => {
    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setDescription('Configuration actuelle du serveur ' + message.guild.name)
        .addField('🌐 Général', `Préfixe: \`${data.prefix}\``)
        .addField('🛡️ Protection', `Raidmode: \`${data.plugins.protection.raidmode ? "Activé" : "Désactivé"}\` \nAnti-give-role: \`${data.plugins.protection.antigiverole ? "Activé" : "Désactivé"}\` \nAntiban: \`${data.plugins.protection.antiban ? "Activé" : "Désactivé"}\` \nAntilien: \`${data.plugins.protection.antilink ? "Activé" : "Désactivé"}\``)
        .addField('👋 Message de bienvenue', `Activé: \`${data.plugins.welcome.enabled ? "Oui" : "Non"}\` \nMessage: \`${data.plugins.welcome.message}\` \nSalon: ${data.plugins.welcome.channel ? '<#' + data.plugins.welcome.channel + '>' : "`MP`"}`)
        .addField('💔 Message d\'aurevoir', `Activé: \`${data.plugins.goodbye.enabled ? "Oui" : "Non"}\` \nMessage: \`${data.plugins.goodbye.message}\` \nSalon: ${data.plugins.goodbye.channel ? '<#' + data.plugins.goodbye.channel + '>' : "`MP`"}`)
        .addField('⚒️ Modération', `Activé: ${data.plugins.logs.enabled ? "`Oui`" : "`Non`"} \nSalon de logs: ${data.plugins.logs.channel ? '<#' + data.plugins.logs.channel + '>' : "`Aucun`"}`)
        .addField('💡 Suggestions', `Activé: ${data.plugins.suggestion.enabled ? "`Oui`" : "`Non`"} \nSalon: ${data.plugins.suggestion.channel ? '<#' + data.plugins.suggestion.channel + '>' : "`Aucun`"}`)
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
    message.channel.send(embed);
}

module.exports.help = {
    name: "config",
    aliases: ["config"],
    category: 'Config',
    description: "Vérifier les paramètres de configuration du serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}