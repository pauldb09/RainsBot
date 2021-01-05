module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner.id) return client.emit('ownerOnly', message);
    const guildID = args[0];
    if(isNaN(guildID) || !guildID || guildID.length != 18) return message.channel.send('⚠️ Vous devez indiquer l\'id d\'une guild.');

    const guild = client.guilds.cache.get(guildID);
    if(guild == undefined) return message.channel.send('⚠️ Cette guild n\'existe pas.');
    if(!guild.available) return message.channel.send('⚠️ Guild non disponible, réessayez plus tard.');

    let invite = await client.guilds.cache.find(g => g.id == guild.id).channels.cache.filter(c => c.type == "text").random().createInvite(
        {
            temporary: false,
            maxAge: 0,
            maxUsers: 0
        }
    ).catch(err => message.channel.send(`Une erreur est survenue lors de l'exécution de la commande: \n\`\`\`js\n${err}\n\`\`\``));
    await message.channel.send('https://discord.gg/' + invite.code);
}

module.exports.help = {
    name: "createinvite",
    aliases: ["createinvite", "cinvite"],
    category: 'Owner',
    description: "Créer une invitation à un serveur",
    usage: "<guild_id>",
    cooldown: 3,
    memberPerms: [],
    botPerms: ["CREATE_INSTANT_INVITE"],
    args: false,
}