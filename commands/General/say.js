module.exports.run = (client, message, args) => {
    let messageContent = args.join(" ");

    if(messageContent.length > 1000) {
        message.delete().catch(() => {});
        return message.reply('impossible d\'envoyer un message long de plus de 1000 caractères !');
    }

    message.channel.send(messageContent);
    message.delete().catch(() => {});
}

module.exports.help = {
    name: "say",
    aliases: ["say", "rep", "repeat"],
    category: "General",
    description: "Envoyer un message par le biais du bot",
    usage: "<message>",
    cooldown: 5,
    memberPerms: [],
    botPerms: [],
    args: true
}