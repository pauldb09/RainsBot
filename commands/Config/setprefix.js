module.exports.run = async (client, message, args, data) => {
    let prefix = args[0];
    if(!prefix) return message.channel.send(`⚠️ Veuillez spécifiez le nouveau préfixe. \nPréfixe actuel: \`${data.prefix}\``);

    if(prefix == data.prefix) return message.channel.send('⚠️ Ce préfixe est le même que l\'actuel!');

    if(prefix.length > 3) return message.channel.send('⚠️ Le préfixe ne peut pas faire plus de 3 caractères!');

    await client.updateGuild(message.guild, { prefix: prefix });
    message.channel.send(`✅ Mon préfixe a été mis jour. Il a été changé à \`${prefix}\``);
}

module.exports.help = {
    name: "setprefix",
    aliases: ["setprefix", "set-prefix", "prefix"],
    category: 'Config',
    description: "Changer le préfixe du bot dans le serveur (max. 3 caractères)",
    usage: "<nouveau préfixe>",
    cooldown: 10,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}