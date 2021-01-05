module.exports.run = async (client, message, args) => {
    if(message.author.id !== client.config.owner.id) return client.emit('ownerOnly', message);
    client.channels.cache.get(client.config.support.logs).send('🔄 **Le bot redémarre...**').then(async() => {
        await client.destroy();
        process.exit();
    })
};
   
module.exports.help = {
    name: "restart",
    aliases: ["restart"],
	category: 'Owner',
    description: "Redémarrer le bot",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: [],
    args: false,
};