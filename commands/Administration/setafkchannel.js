module.exports.run = (client, message, args) => {
    const channel = message.guild.channels.cache.get(args[0]);

    if(args[0] == "remove") {
        message.guild.setAFKChannel(null);
        return message.channel.send('✅ Le salon vocal AFK a été retiré.')
    }

    if(!channel) return message.channel.send('⚠️ Veuillez donner l\'id du salon a définir comme salon afk.');

    if(channel.type != "voice") return message.channel.send('⚠️ Ce salon n\'est pas un salon vocal !');

    if(channel == message.guild.afkChannel) return message.channel.send('⚠️ Ce salon est déjà défini comme salon AFK.');

    message.guild.setAFKChannel(channel).catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    });
    message.channel.send(`✅ Le salon vocal AFK a été changé sur le salon **#${channel.name}**.`);
}

module.exports.help = {
    name: "setafkchannel",
    aliases: ["setafkchannel", "setafk", "set-afk-channel", "afkchannel"],
    category: 'Administration',
    description: "Modifier ou ajouter le salon vocal AFK",
    usage: "<salon | remove>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    args: true
}