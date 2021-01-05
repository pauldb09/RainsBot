module.exports.run = async (client, message, args, data) => {
    if(data.plugins.protection.antilink === false) {
        data.plugins.protection.antilink = true;

        data.markModified("plugins.protection.antilink");
        data.save();

        message.channel.send('✅ **Anti lien activé avec succès**');
    } else if(data.plugins.protection.antilink === true) {
        data.plugins.protection.antilink = false;

        data.markModified("plugins.protection.antilink");
        data.save();

        message.channel.send('✅ **Anti lien désactivé avec succès**');
    }
}

module.exports.help = {
    name: "antilink",
    aliases: ["antilink", "anti-link", "antilien", "anti-lien"],
    category: 'Protection',
    description: "Activer/Désactiver l'anti lien sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    args: false
}