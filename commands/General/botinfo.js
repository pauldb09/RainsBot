const botinfos = require('../../package.json');

module.exports.run = async (client, message) => {
    message.channel.send({
        embed: {
            color: client.config.embed.color,
            author: {
                name: `Infos de ${client.user.username}`,
                icon_url: client.user.displayAvatarURL()
            },
            description: botinfos.description,
            fields: [
                {
                    name: 'Serveurs',
                    value: client.guilds.cache.size,
                    inline: true
                },
                {
                    name: 'Utilisateurs',
                    value: client.users.cache.size,
                    inline: true
                },
                {
                    name: 'Salons',
                    value: client.channels.cache.size,
                    inline: true
                },
                {
                    name: 'Version',
                    value: botinfos.version,
                    inline: true
                },
                {
                    name: 'Uptime',
                    value: `${(Math.round(client.uptime / (1000 * 60 * 60 * 24)) % 30)}j ${(Math.round(client.uptime / (1000 * 60 * 60)))}h ${(Math.round(client.uptime / (1000 * 60)) % 60)}m ${(Math.round(client.uptime / 1000) % 60)}s`,
                    inline: true
                },
                {
                    name: 'Mémoire',
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                    inline: true
                },
                {
                    name: "Commandes",
                    value: client.commands.size,
                    inline: true
                },
                {
                    name: "GitHub",
                    value: "[RainsBot](https://github.com/COCO150/RainsBot)",
                    inline: true
                },
                {
                    name: 'Développeur',
                    value: client.config.owner.name,
                    inline: true
                },
                {
                    name: "Lien d'invitation",
                    value: "[Clique ici](https://discord.com/oauth2/authorize?client_id=781911855299035217&scope=bot&permissions=2147483647)",
                    inline: true
                },
                {
                    name: "Support",
                    value: "[Clique ici](https://discord.gg/SSWQamBCFE)",
                    inline: true
                },
                {
                    name: "Crédits",
                    value: "[Androz2091](https://github.com/Androz2091/AtlantaBot)",
                    inline: true
                }
            ],
            footer: {
                text: client.config.embed.footer,
                icon_url: client.user.displayAvatarURL()
            }
        }
    })
}

module.exports.help = {
    name: "botinfo",
    aliases: ["botinfo", "bi", "botinfos", "infobot", "infosbot", "bot-info", "bot-infos"],
    category: "General",
    description: "Afficher des informations à propos du bot",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}