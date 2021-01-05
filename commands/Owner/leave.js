module.exports.run = (client, message, args) => {
    if(message.author.id !== client.config.owner.id) return client.emit('ownerOnly', message);
    const guildID = args[0];
    if(isNaN(guildID) || !guildID || guildID.length != 18) {
        return message.channel.send(`⚠️ Vous devez indiquer l'id d'une guild à quitter.`);
    } else {
        const guild = client.guilds.cache.get(guildID);
        if(guild === undefined) return message.channel.send('⚠️ Cette guild n\'existe pas.');
        if(!guild.available) return message.channel.send('⚠️ Guild non disponible, réessayez plus tard.');

        client.guilds.cache.get(guildID).leave()
        .then(x => {
            console.log(`J'ai quitté le serveur ${x.name} avec la commande ${client.config.prefix}leave`);
            message.channel.send(`✅ J'ai bien quitté le serveur ${x.name}`).catch(() => {});
        })
        .catch(err => {
            console.log(`[ERROR] Une erreur est survenue lors du processus: \n${err}`);
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        })
    }
}

module.exports.help = {
    name: "leave",
    aliases: ["leave"],
    category: 'Owner',
    description: "Quitter un serveur",
    usage: "<guild_id>",
    cooldown: 3,
    memberPerms: [],
    botPerms: [],
    args: false
}