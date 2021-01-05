module.exports.run = (client, message, args) => {
    let messageID = args[0]
    if(!messageID || isNaN(parseInt(messageID)) || messageID.length != 18) return message.channel.send('⚠️ Veuillez spécifier l\'id d\'un giveaway a relancer. \nPour récupérer l\'id, faites clic droit sur le giveaway -> Copier l\'identifiant. Si cette option n\'apparraît pas, allez dans vos Paramètres utilisateurs -> Apparence -> Mode développeur.');

    client.giveawaysManager.edit(messageID, {
        setEndTimestamp: Date.now()
    }).catch(err => {
        if(err.endsWith('is already ended.')) {
            message.channel.send(`Le giveaway avec l'id ${messageID} est déjà terminé.`);
        } else if(err.startsWith('No giveaway found with ID')) {
            message.channel.send(`Aucun giveaway trouvé avec comme id ${messageID}.`)
        } else {
            console.log(err);
            message.channel.send(`\`\`\`\n${err}\n\`\`\``);
        }
    })
}

module.exports.help = {
    name: "end",
    aliases: ["end"],
    category: "Giveaways",
    description: "Terminer un giveaway",
    usage: "<id du giveaway>",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: [],
    args: true
}