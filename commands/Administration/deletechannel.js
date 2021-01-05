const { MessageCollector } = require("discord.js");
const emojis = require('../../emojis');

module.exports.run = async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || args[0].toLowerCase();
    if(!channel) return message.channel.send('⚠️ Veuillez spécifier un salon a supprimer.');

    if(channel === "all") {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('⚠️ Seuls les Administrateurs peuvent faire cette action !');

        const filter = m => m.author.id === message.author.id;
        const msg1 = await message.channel.send(`**⚠️ ${message.author}, êtes vous sûr de vouloir supprimer TOUS les salons ? Il n'en restera aucun. \nCette action est irréversible**. \nRépondez par oui ou par non.`);

        const c = new MessageCollector(message.channel, filter, {
            time: 30000
        });

        c.on("collect", async msg => {
            if(msg.content.toLowerCase() == "oui") {
                c.stop(true);
                if(message.guild.features.toString().includes('COMMUNITY')) return message.channel.send('⚠️ Ce serveur a la communauté d\'activée. Impossible de faire la commande `deletechannel all`. \nDésactivez la communauté sur votre serveur pour que je puisse supprimer la totalité des salons présents sur votre serveur !');

                await message.channel.send('Suppression des salons... ' + emojis.chargement);

                await message.guild.channels.cache.forEach(async c => {
                    const channels = message.guild.channels.cache.get(c.id);
                    if(channels === undefined) return;

                    await channels.delete()
                    .catch(err => {
                        msg1.delete().catch(() => {});
                        message.author.send(`❌ Une erreur est survenue. Erreur: \n\`\`\`js\n${err}\n\`\`\``).catch(() => {})
                    });
                    client.users.cache.get(message.guild.ownerID).send('✅ Tous les salons on été supprimés par **' + message.author.tag + '**!').catch(() => {});
                })
            } else {
                c.stop(true);
                return message.channel.send('Commande annulée');
            }
        });

        c.on("end", (_, reason) => {
            if(reason === "time") return message.channel.send('Temps écoulé');
        })
    } else if(channel.type === "text" || channel.type === "voice" || channel.type === "news") {
        if(!message.member.permissionsIn(channel).has("MANAGE_CHANNELS")) return message.channel.send('⚠️ Vous n\'avez pas les permissions de supprimer ce salon.');

        if(!channel.deletable || channel.deleted) return message.channel.send('⚠️ Je ne peux pas supprimer ce salon, vérifiez que j\'ai la permission Gérer les salons pour le supprimer, et réessayez.');

        await channel.delete().then(() => {
            message.channel.send(`✅ Le salon **#${channel.name}** a été supprimé.`).catch(() => {});
        }).catch(err => {
            console.log(err);
            message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
        })
    } else {
        return message.channel.send('⚠️ Veuillez indiquer un salon valide en le mentionnant ou en donnant son id.');
    }
}

module.exports.help = {
    name: "deletechannel",
    aliases: ["deletechannel", "delete-channel", "channeldelete", "channel-delete"],
    category: 'Administration',
    description: "Supprimer un salon textuel ou vocal ou supprimer tous les salons du serveur (Nécessite la permissions Administrateur)",
    usage: "<salon | all>",
    cooldown: 15,
    memberPerms: ["MANAGE_CHANNELS"],
    botPerms: [],
    args: true
}