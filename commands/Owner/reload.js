module.exports.run = (client, message, args) => {
	if (message.author.id !== client.config.owner.id) return client.emit('ownerOnly', message);
	
	if(!args.length) return message.channel.send('⚠️ Indiquez une commande à reload!');
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName);

	if(!command || command.help.category == undefined) { 
		return message.channel.send(`⚠️ ${message.author}, impossible de reload la commande \`${commandName}.js\` \nVérifiez son orthographe et aussi que la commande est dans une categorie.`);
	} else {
		delete require.cache[require.resolve(`../${command.help.category}/${commandName}`)];

		try {
			const newCommand = require(`../${command.help.category}/${command.help.name}.js`);
			message.client.commands.set(newCommand.help.name, newCommand);
			message.channel.send(`✅ La commande \`${command.help.name}\` a bien été reload !`);
		} catch (error) {
			console.log(error);
			return message.channel.send(`⚠️ Une erreur est survenu lors du reload de la commande \`${command.help.name}\`:\n\`\`\`js\n${error.message}\n\`\`\``);
		}
	}
}

module.exports.help = {
    name: "reload",
    aliases: ["reload"],
	category: 'Owner',
    description: "Redémarrer une commande",
    usage: "<commande>",
    cooldown: 5,
    memberPerms: [],
    botPerms: [],
    args: false
}