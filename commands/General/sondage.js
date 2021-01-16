const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
    .setColor(client.config.embed.color)
    .setAuthor(`Sondage de ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    .setFooter(client.config.embed.footer, client.user.displayAvatarURL());

    if(args.length) {
        let survey = args.join(" ");

        if(survey.length < 5 || survey.length > 500) return message.channel.send('⚠️ Votre sondage doit faire entre 5 et 500 caractères !');

        embed.setDescription(survey + '\n\n✅ ➔ Pour \n❎ ➔ Contre');
        message.channel.send(embed).then(async m => {
            await m.react('✅');
            await m.react('❎');
        });
    } else {
        let msg = message.channel.send('Quel affirmation souhaitez-vous donner à votre sondage ?');
        const filter = m => m.author.id === message.author.id;

        const c = new MessageCollector(message.channel, filter, {
            time: 30000,
            max: 1
        })

        c.on('collect', async tmsg => {
            if(tmsg.content.toLowerCase() === "annuler") {
                c.stop(true);
                message.channel.send('Commande annulée.');
                msg.delete().catch(() => {});
            } else {
                let survey = tmsg.content;

                if(survey.length < 5 || survey.length > 500) return message.channel.send('⚠️ Votre sondage doit faire entre 5 et 500 caractères !');

                embed.setDescription(survey + '\n✅ ➔ Pour \n❎ ➔ Contre');
                message.channel.send(embed).then(async m => {
                    await m.react('✅');
                    await m.react('❎');
                });
            }
        })

        c.on('end', (_, reason) => {
            if(reason == "time") return message.channel.send('Temps écoulé');
        })
    }
}

module.exports.help = {
    name: "sondage",
    aliases: ["sondage", "sondages", "survey"],
    category: "General",
    description: "Lancer un sondage",
    usage: "<sondage>",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}
