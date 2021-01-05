const { MessageCollector } = require('discord.js');

module.exports.run = async (client, message, args, data) => {
    if(!data.plugins.autorole.enabled) return message.channel.send(`⚠️ Le plugins d'autorole n'est pas activé, faites \`${data.prefix}enable autorole\` pour l'activer!`);

    if(args.length) {
        const newRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0].toLowerCase());

        if(!newRole) return message.channel.send('⚠️ Ce rôle n\'existe pas.');

        if(newRole.id === message.guild.roles.everyone.id) return message.channel.send('⚠️ Rôle invalide.');

        if(message.member.roles.highest <= newRole.position) return message.channel.send('⚠️ Vous n\'avez pas la permission de donner ce rôle.');

        if(!newRole.editable) return message.channel.send('⚠️ Je ne peux pas donner ce rôle, vérifiez que j\'ai les permissions nécessaires et que le rôle est bien placé en dessous de moi !');

        if(newRole.id == data.plugins.autorole.role) return message.channel.send('⚠️ Ce rôle est le même que celui actuellement défini.');

        data.plugins.autorole = {
            enabled: true,
            role: newRole.id
        }

        data.markModified("plugins.autorole");
        data.save();

        message.channel.send(`✅ L'autorole a bien été configuré avec succès. Le rôle \`@${newRole.name}\` sera donné aux nouveaux membres !`);
    } else {
        message.channel.send("Quel rôle souhaitez-vous donner aux nouveaux membres ?");

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
                const newRole = msg.mentions.roles.first() || message.guild.roles.cache.get(msg.content) || message.guild.roles.cache.find(r => r.name.toLowerCase() === msg.content.toLowerCase());

                if(!newRole) return message.channel.send('⚠️ Ce rôle n\'existe pas.');

                if(newRole.id === message.guild.roles.everyone.id) return message.channel.send('⚠️ Rôle invalide.');

                if(message.member.roles.highest.position <= newRole.position) return message.channel.send('⚠️ Vous n\'avez pas la permission de donner ce rôle.');

                if(!newRole.editable) return message.channel.send('⚠️ Je ne peux pas donner ce rôle, vérifiez que j\'ai les permissions nécessaires et que le rôle est bien placé en dessous de moi !');

                if(newRole.id == data.plugins.autorole.role) return message.channel.send('⚠️ Ce rôle est le même que celui actuellement défini.');

                data.plugins.autorole = {
                    enabled: true,
                    role: newRole.id
                }

                data.markModified("plugins.autorole");
                data.save();

                message.channel.send(`✅ L'autorole a bien été configuré avec succès. Le rôle \`@${newRole.name}\` sera donné aux nouveaux membres !`);
            }
        })
    }
}

module.exports.help = {
    name: "autorole",
    aliases: ["autorole", "auto-role"],
    category: 'Config',
    description: "Rajouter un autorole sur le serveur",
    usage: "<role>",
    cooldown: 5,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["EMBED_LINKS"],
    args: false
}