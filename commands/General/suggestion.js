const { MessageCollector, MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, data) => {
    if(!data.plugins.suggestion.enabled) {
        desc = "⚠️ Les suggestions ne sont pas activées sur le serveur!";
        if(message.member.hasPermission("MANAGE_GUILD")) desc = desc += "\nActivez les grâce à la commande `" + data.prefix + "enable suggestion`.";
        return message.channel.send(desc);
    }

    if(!data.plugins.suggestion.channel) {
        desc = "⚠️ Le salon de suggestion n'est pas défini";
        if(message.member.hasPermission("MANAGE_GUILD")) desc = desc += "\nConfigurez le avec la commande `" + data.prefix + "suggestion-channel`.";
        return message.channel.send(desc);
    }

    let embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(` - Suggestion de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL());

    if(!args.length) {
        message.channel.send('Quelle suggestion souhaitez-vous soumettre au serveur ?');

        const filter = (m) => m.author.id === message.author.id;

        const c = new MessageCollector(message.channel, filter, {
            time: 60000,
            max: 1
        })

        c.on("collect", async msg => {
            if(msg.content.toLowerCase() === "annuler") {
                c.stop(true);
                return message.channel.send('Commande annulée');
            } else {
                if(msg.content.length < 5) return message.channel.send('Veuillez faire une suggestion plus longue que ça!');

                if(msg.content.length > 1000) return message.channel.send('Votre suggestion est trop longue :/');

                embed.setDescription(msg.content);
                message.guild.channels.cache.get(data.plugins.suggestion.channel).send(embed).then(async m => {
                    await m.react("✅");
                    await m.react("❌");
                })
                message.channel.send(`Votre suggestion a bien été envoyé dans <#${data.plugins.suggestion.channel}> !`);
            }
        })

        c.on("end", (_, reason) => {
            if(reason == "time") return message.channel.send('Temps écoulé');
        })
    } else {
        let suggestion = args.slice(0).join(' ');

        if(!suggestion) return message.channel.send('Veuillez spécifiez une suggestion!');

        if(suggestion.length < 5) return message.channel.send('Veuillez faire une suggestion plus longue que ça!');

        if(suggestion.length > 1000) return message.channel.send('Votre suggestion est trop longue :/');

        embed.setDescription(suggestion);
        message.guild.channels.cache.get(data.plugins.suggestion.channel).send(embed).then(async m => {
            await m.react("✅");
            await m.react("❌");
        })
        message.channel.send(`Votre suggestion a bien été envoyé dans <#${data.plugins.suggestion.channel}> !`);
    }
}

module.exports.help = {
    name: "suggestion",
    aliases: ["suggestion", "suggestions", "suggest"],
    category: 'General',
    description: "Soumettre une suggestion au serveur",
    usage: "<suggestion>",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}