const { MessageCollector } = require('discord.js');

module.exports.run = async (client, message) => {
    let msg = await message.channel.send('Quel titre voulez-vous donner à votre embed ?');

    const filter = m => m.author.id === message.author.id;

    const c1 = new MessageCollector(message.channel, filter, {
        time: 30000,
    })

    c1.on("collect", async tmsg => {
        if(tmsg.content.toLowerCase() === "annuler") {
            c1.stop(true);
            message.channel.send('Commande annulée');
        } else {

            let title = tmsg.content;
            if(title.length > 50 || title.length < 3) return message.channel.send('⚠️ Votre titre doit faire entre 3 et 50 caractères!');

            c1.stop(true);

            let msg2 = await message.channel.send('Quel description souhaitez-vous donner à votre embed ?');

            const c2 = new MessageCollector(message.channel, filter, {
                time: 120000,
                max: 1
            })

            c2.on("collect", async tmsg1 => {
                if(tmsg1.content.toLowerCase() === "annuler") {
                    c2.stop(true);
                    message.channel.send('Commande annulée');
                } else {
                    let description = tmsg1.content;
                    if(description.length > 500 || description.length < 10) return message.channel.send('⚠️ Votre description doit faire entre 10 et 500 caractères!');

                    c2.stop(true);
                    msg.delete().catch(() => {});
                    msg2.delete().catch(() => {});
                    tmsg.delete().catch(() => {});
                    tmsg1.delete().catch(() => {});

                    message.channel.send({
                        embed: {
                            color: client.config.embed.color,
                            author: {
                                name: title,
                            },
                            description: description,
                            footer: {
                                text: message.guild.name,
                                icon_url: message.guild.iconURL({ dynamic: true })
                            },
                            timestamp: new Date()
                        }
                    })
                }
            })

            c2.on("end", (_collected, reason) => {
                if(reason == "time") message.channel.send('Temps écoulé');
            })
        }
    })

    c1.on("end", (_collected, reason) => {
        if(reason == "time") message.channel.send('Temps écoulé');
    })
}

module.exports.help = {
    name: "embed",
    aliases: ["embed", "customembed", "custom-embed"],
    category: "General",
    description: "Faire un embed custom",
    usage: "",
    cooldown: 5,
    memberPerms: ["EMBED_LINKS"],
    botPerms: ["EMBED_LINKS"],
    args: false
}