module.exports.run = async (client, message, args, data) => {
    message.channel.send('Cette commande n\'est pas disponible pour le moment. Pour être au courant des nouveautés du bot, rendez-vous sur notre support via la commande `' + data.prefix + 'support`.');
    // if(data.plugins.protection.antiban === false) {
    //     data.plugins.protection.antiban = true;

    //     data.markModified("plugins.protection.antiban");
    //     data.save();

    //     message.channel.send('✅ **Antiban activé avec succès**');
    // } else if(data.plugins.protection.antiban === true) {
    //     data.plugins.protection.antiban = false;

    //     data.markModified("plugins.protection.antiban");
    //     data.save();

    //     message.channel.send('✅ **Antiban désactivé avec succès**');
    // }
}

module.exports.help = {
    name: "antiban",
    aliases: ["antiban", "anti-ban"],
    category: 'Protection',
    description: "Activer/Désactiver l'antiban sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    args: false
}