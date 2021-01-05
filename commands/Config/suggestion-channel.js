const { MessageCollector } = require('discord.js');

module.exports.run = (client, message, args, data) => {
    if(!data.plugins.suggestion.enabled) return message.channel.send(`⚠️ Le plugin de suggestion n'est pas activé. Faites \`${data.prefix}enable suggestion\` pour l'activer!`);

    if(args.length) {
        const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if(!newChannel) return message.channel.send('⚠️ Ce salon n\'existe pas.');

        if(newChannel.type !== "text") return message.channel.send('⚠️ Le salon de suggestion ne peut être uniquement un salon textuel.');

        if(!message.member.permissionsIn(newChannel).has("MANAGE_CHANNELS")) return message.channel.send('⚠️ Vous devez avoir la permission Gérer les salons dans le salon pour faire cette action.');

        if(!message.guild.me.permissionsIn(newChannel).has("EMBED_LINKS")) return message.channel.send('⚠️ Je n\'ai pas les permissions suffisantes dans ce salon. Vérifiez que j\'ai bien la permission Intégrer dans lien dans celui-ci !');

        if(newChannel.id == data.plugins.suggestion.channel) return message.channel.send('⚠️ Ce salon est le même que celui actuellement défini.');

        data.plugins.suggestion = {
            enabled: true,
            channel: newChannel.id
        }

        data.markModified("plugins.suggestion");
        data.save();

        message.channel.send(`✅ Les suggestions ont bien été activés sur le serveur. Toutes les suggestions faites via la commande \`${data.prefix}suggestion\` seront envoyées dans le salon <#${newChannel.id}>!`);
    } else {
        message.channel.send("Quel salon souhaitez-vous définir comme salon de suggestion ?");

        const filter = m => m.author.id === message.author.id;

        const c = new MessageCollector(message.channel, filter, {
            time: 30000,
            max: 1
        })

        c.on("collect", async msg => {
            if(msg.content.toLowerCase() === "annuler") {
                c.stop(true);
                return message.channel.send('Commande annulée');
            } else {
                const newChannel = msg.mentions.channels.first() || message.guild.channels.cache.get(msg.content);

                if(!newChannel) return message.channel.send('⚠️ Ce salon n\'existe pas.');
        
                if(newChannel.type !== "text") return message.channel.send('⚠️ Le salon de suggestion ne peut être uniquement un salon textuel.');
        
                if(!message.member.permissionsIn(newChannel).has("MANAGE_CHANNELS")) return message.channel.send('⚠️ Vous devez avoir la permission Gérer les salons dans le salon pour faire cette action.');
        
                if(!message.guild.me.permissionsIn(newChannel).has("EMBED_LINKS")) return message.channel.send('⚠️ Je n\'ai pas les permissions suffisantes dans ce salon. Vérifiez que j\'ai bien la permission Intégrer dans lien dans celui-ci !');
        
                if(newChannel.id == data.plugins.suggestion.channel) return message.channel.send('⚠️ Ce salon est le même que celui actuellement défini.');

                data.plugins.suggestion = {
                    enabled: true,
                    channel: newChannel.id
                }

                data.markModified("plugins.suggestion");
                data.save();

                message.channel.send(`✅ Les suggestions ont bien été activés sur le serveur. Toutes les suggestions faites via la commande \`${data.prefix}suggestion\` seront envoyées dans le salon <#${newChannel.id}>!`);
            }
        })

        c.on("end", (_, reason) => {
            if(reason == "time") return message.channel.send('Temps écoulé');
        })
    }
}

module.exports.help = {
    name: "suggestion-channel",
    aliases: ["suggestion-channel", "suggestionchannel", "suggestions-channel", "suggestionschannel"],
    category: 'Config',
    description: "Configurer le salon de suggestions du serveur",
    usage: "<salon>",
    cooldown: 5,
    memberPerms: ["MANAGE_CHANNELS"],
    botPerms: ["EMBED_LINKS"],
    args: false
}