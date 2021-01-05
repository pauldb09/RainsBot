const emojis = require('../../emojis');

module.exports.run = async (client, message, args) => {
    let user;

    if(!args.length) {
        user = message.author;
    } else {
    user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));
    };

    if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    let msg = await message.channel.send(`Chargement... ${emojis.chargement}`);

	message.channel.send({ 
        embed: {
            color: message.guild.member(user).displayHexColor,
            title: `Avatar de ${user.username}`,
		    image: {
			    url: user.displayAvatarURL({ size: 512, dynamic: true })
		    },
        }
    }).catch(err => {
		message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \nErreur: \`\`\`js\n${err}\n\`\`\``)
	});

	await msg.delete().catch(() => {});
}

module.exports.help = {
    name: "avatar",
    aliases: ["avatar", "pp", "pdp"],
    category: "General",
    description: "Voir l'avatar d'un utilisateur",
    usage: "[utilisateur]",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
};