const emojis = require('../../emojis');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, data) => {
    if(!args.length) {
    const categories = [];
    const commands = client.commands;

    commands.forEach(command => {
        if(!categories.includes(command.help.category)){
            if(command.help.category === "Owner" && message.author.id !== client.config.owner.id) return;

            categories.push(command.help.category);
        }
    })

    const helpEmbed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`📚 - Commandes de ${client.user.username}`)
        .setDescription(`Faites **${data.prefix}help [commande]** pour afficher des informations sur une commande ! \n\u200b`)
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
    categories.sort().forEach(cat => {
        const tCommands = commands.filter(cmd => cmd.help.category === cat);
        helpEmbed.addField(emojis.categories[cat] + "  " + cat + " - " + tCommands.size, tCommands.map(cmd => "`" + cmd.help.name + "`").join(', '));
    })    

    return message.channel.send(helpEmbed)
    } else {
        const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        if(!command) return message.channel.send(`⚠️ Cette commande n'existe pas, vérifiez l'orthographe et réessayez.`)

        const helpEmbed2 = new MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle(`📚 Help - ${command.help.aliases[0]}`)
            .setDescription('<> ➔ champ obligatoire \n[] ➔ champ facultatif')
            .addFields(
                { name: "Description", value: command.help.description, inline: true },
                { name: "Utilisation", value: command.help.usage ? data.prefix + command.help.name + " " + command.help.usage : data.prefix + command.help.name, inline: false },
                { name: "Aliases", value: command.help.aliases.length > 1 ? command.help.aliases.map(a => "`" + a + "`").join(', ') : "Aucun alias", inline: false },
                { name: "Cooldown", value: command.help.cooldown + "s", inline: false },
                { name: "Permissions", value: `**Bot**: ${command.help.botPerms.length > 0 ? command.help.botPerms.map(p => "`" + p + "`").join(", ") : "Pas de permissions requise"} \n**Membres**: ${command.help.memberPerms.length > 0 ? command.help.memberPerms.map(p => "`" + p + "`").join(', ') : "Aucune permissions requise"}`, inline: false },
            )
            .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
        message.channel.send(helpEmbed2)
    }
}

module.exports.help = {
    name: "help",
    aliases: ["help", "aide", "h", "commands", "commandes"],
    category: "General",
    description: "Afficher toutes les commandes disponibles",
    usage: "[commande]",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}