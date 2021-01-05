const { MessageCollector } = require('discord.js');

module.exports.run = async (client, message, args, data) => {
    if(!data.plugins.goodbye.enabled) return message.channel.send(`⚠️ Le plugin d'aurevoir n'est pas activé. Faites \`${data.prefix}enable goodbye\` pour l'activer!`);

    if(!args.length) return message.channel.send('Veuillez spécifiez un paramètre à modifier. \nParamètres disponibles: `channel`, `message`');

    if(args[0] === "channel" || args[0] === "salon") {
        let MSG = await message.channel.send('Voulez vous définir le salon d\'aurevoir maintenant ? \nRépondez par oui ou par non.');

        const filter = m => m.author.id === message.author.id;

        const c1 = new MessageCollector(message.channel, filter, {
            time: 30000
        })

        c1.on("collect", async msg1 => {
            if(msg1.content.toLowerCase() == "oui") {
                c1.stop(true);
    
                let MSG1 = await message.channel.send('Quel salon souhaitez-vous définir comme salon d\'aurevoir ?');
    
                const c2 = new MessageCollector(message.channel, filter, {
                    time: 60000,
                    max: 3,
                })
    
                c2.on("collect", async msg2 => {
                    const channel = msg2.mentions.channels.first() || msg2.guild.channels.cache.get(msg2.content);
                    if(!channel) return message.channel.send('⚠️ Ce salon n\'existe pas, vérifiez que j\'ai accès au salon.');
    
                    if(channel.type != "text") return message.channel.send('⚠️ Merci de donner un salon de type textuel. Les salons d\'annonces ne sont pas acceptés.');

                    if(channel.id == data.plugins.goodbye.channel) return message.channel.send('⚠️ Ce salon est déjà défini comme salon d\'aurevoir!');

                    if(!message.guild.me.permissionsIn(channel).has('SEND_MESSAGES')) return message.channel.send('⚠️ Je n\'ai pas les permissions de parler dans ce salon, mettez moi la permission Envoyer des messages dans le salon.');
    
                    c2.stop(true);
    
                    MSG.delete().catch(() => {});
                    MSG1.delete().catch(() => {});
                    msg1.delete().catch(() => {});
                    msg2.delete().catch(() => {});
    
                    data.plugins.goodbye = {
                        enabled: true,
                        message: data.plugins.goodbye.message,
                        channel: channel.id
                    }

                    data.markModified("plugins.goodbye");
                    data.save();
    
                    message.channel.send('✅ Salon d\'aurevoir modifié. Les messages d\'aurevoir s\'enverront désormais dans <#' + channel.id + '>. \nFaites `' + data.prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
                })
    
                c2.on("end", (collected, reason) => {
                    if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                    if(reason === "time") return message.channel.send('Temps écoulé');
                })
            } else {
                c1.stop(true);
    
                message.delete().catch(() => {});
                MSG.delete().catch(() => {});
                message.channel.send('Commande annulée');
            }
        })
    
        c1.on("end", (_, reason) => {
            if(reason === "time") {
                return message.channel.send('Temps écoulé');
            }
        })
    } else if(args[0] === "message") {
        let MSG = await message.channel.send('Voulez vous définir le message d\'aurevoir maintenant ? \nRépondez par oui ou par non.');

        const filter = m => m.author.id === message.author.id;

        const c3 = new MessageCollector(message.channel, filter, {
            time: 30000
        })

        c3.on("collect", async msg1 => {
            if(msg1.content.toLowerCase() == "OUI".toLowerCase()) {
                c3.stop(true);
    
                let MSG1 = await message.channel.send('Quel message souhaitez-vous définir comme message d\'aurevoir ?');
    
                const c4 = new MessageCollector(message.channel, filter, {
                    time: 60000,
                    max: 3,
                })
    
                c4.on("collect", async msg2 => {
                    const newMessage = msg2.content;

                    if(newMessage.length < 5 || newMessage.length > 200) return message.channel.send('⚠️ Le message d\'aurevoir doit faire plus de 5 caractères et moins de 200!');

                    if(newMessage === data.plugins.welcome.message) return message.channel.send('⚠️ Ce message est le même que celui actuellement défini 🤔');
    
                    c4.stop(true);
    
                    MSG.delete().catch(() => {});
                    MSG1.delete().catch(() => {});
                    msg1.delete().catch(() => {});
                    msg2.delete().catch(() => {});
    
                    data.plugins.goodbye = {
                        enabled: true,
                        message: newMessage,
                        channel: data.plugins.goodbye.channel
                    }

                    data.markModified("plugins.goodbye");
                    data.save();
    
                    message.channel.send('✅ Message d\'aurevoir modifié. \nFaites `' + data.prefix + 'config` pour voir la configuration actuelle du bot sur le serveur!');
                })
    
                c4.on("end", (collected, reason) => {
                    if(collected.size >= 3) return message.channel.send('Vous avez fait trop d\'essais! Refaite la commande puis réessayez.');
                    if(reason === "time") return message.channel.send('Temps écoulé');
                })
            } else {
                c3.stop(true);

                message.delete().catch(() => {});
                MSG.delete().catch(() => {});
                message.channel.send('Commande annulée');
            }
        })
    
        c3.on("end", (_, reason) => {
            if(reason === "time") {
                return message.channel.send('Temps écoulé');
            }
        })
    } else if(args[0] == "test") {
        if(!data.plugins.goodbye.channel) return message.channel.send('Aucun salon d\'aurevoir n\'est défini. Faites `' + data.prefix + 'goodbye channel` pour le configurer!');

        let goodbyeMsg = data.plugins.goodbye.message;
        if(goodbyeMsg.includes('{user}')) goodbyeMsg = goodbyeMsg.replace('{user}', message.author);
        if(goodbyeMsg.includes('{guildName}')) goodbyeMsg = goodbyeMsg.replace('{guildName}', message.guild.name);
        if(goodbyeMsg.includes('{memberCount}')) goodbyeMsg = goodbyeMsg.replace('{memberCount}', message.guild.memberCount);
        if(goodbyeMsg.includes('{username}')) goodbyeMsg = goodbyeMsg.replace('{username}', message.author.username);
        if(goodbyeMsg.includes('{usertag}')) goodbyeMsg = goodbyeMsg.replace('{usertag}', message.author.tag);

        message.guild.channels.cache.get(data.plugins.goodbye.channel).send(goodbyeMsg);

        return message.channel.send('Test effectué, allez voir ca dans <#' + data.plugins.goodbye.channel + '> !');
    } else {
        message.channel.send('Veuillez spécifiez un paramètre à modifier. \nParamètres disponibles: `channel`, `message`');
    }
}

module.exports.help = {
    name: "goodbye",
    aliases: ["goodbye"],
    category: 'Config',
    description: "Modifier le message ou le salon d'aurevoir",
    usage: "<message | channel | test>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}