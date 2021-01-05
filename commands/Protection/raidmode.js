module.exports.run = async (client, message, args, data) => {
    if(data.plugins.protection.raidmode === false) {
        data.plugins.protection.raidmode = true;

        data.markModified("plugins.protection.raidmode");
        data.save();

        message.channel.send('✅ **Raidmode activé avec succès**');
    } else if(data.plugins.protection.raidmode === true) {
        data.plugins.protection.raidmode = false;

        data.markModified("plugins.protection.raidmode");
        data.save();

        message.channel.send('✅ **Raidmode désactivé avec succès**');
    }
}

module.exports.help = {
    name: "raidmode",
    aliases: ["raidmode", "raidmod"],
    category: 'Protection',
    description: "Activer/Désactiver le mode raid sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["KICK_MEMBERS"],
    botPerms: ["KICK_MEMBERS"],
    args: false
}