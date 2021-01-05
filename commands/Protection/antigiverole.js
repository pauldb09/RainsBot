module.exports.run = async (client, message, args, data) => {
    if(data.plugins.protection.antigiverole === false) {
        data.plugins.protection.antigiverole = true;

        data.markModified("plugins.protection.antigiverole");
        data.save();

        message.channel.send('✅ **Antigiverole activé avec succès**');
    } else if(data.plugins.protection.antigiverole === true) {
        data.plugins.protection.antigiverole = false;

        data.markModified("plugins.protection.antigiverole");
        data.save();

        message.channel.send('✅ **Antigiverole désactivé avec succès**');
    }
}

module.exports.help = {
    name: "antigiverole",
    aliases: ["antigiverole", "anti-give-role"],
    category: 'Protection',
    description: "Activer/Désactiver l'antigiverole sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGE_ROLES"],
    args: false
}