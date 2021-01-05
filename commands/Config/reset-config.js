const { MessageCollector } = require("discord.js");

module.exports.run = async (client, message) => {
    message.channel.send('Voulez-vous vraiment remettre la configuration du serveur ? Cette action est irréversible. \nRépondez par oui ou par non.');

    const filter = m => m.author.id === message.author.id

    const c = new MessageCollector(message.channel, filter, {
        time: 30000,
        max: 1
    })

    c.on("collect", async msg => {
        if(msg.content.toLowerCase() === "oui") {
            c.stop(true);

            await client.updateGuild(message.guild, {
                plugins: {
                    protection: {
                        raidmode: false,
                        antigiverole: false,
                        antiban: false,
                        antilink: false
                    },
                    welcome: {
                        enabled: false,
                        message: client.config.defaultsSettings.welcomeMessage,
                        channel: null
                    },
                    goodbye: {
                        enabled: false,
                        message: client.config.defaultsSettings.goodbyeMessage,
                        channel: null
                    },
                    logs: {
                        enabled: false,
                        channel: null
                    },
                    autorole: {
                        enabled: false,
                        role: null
                    },
                    suggestion: {
                        enabled: false,
                        channel: null
                    }
                },
                muterole: null
            })
        
            message.channel.send('✅ La configuration a bien été reset.');
        } else {
            c.stop(true);
            message.channel.send('Commande annulée');
        }
    })

    c.on("end", (_collected, reason) => {
        if(reason === "time") return message.channel.send('Temps écoulé');
    })
}

module.exports.help = {
    name: "reset-config",
    aliases: ["reset-config", "resetconfig"],
    category: 'Config',
    description: "Remettre la configuration du serveur à 0",
    usage: "",
    cooldown: 5,
    memberPerms: ["ADMINISTRATOR"],
    botPerms: ["EMBED_LINKS"],
    args: false
}