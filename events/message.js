const Discord = require('discord.js');
const Guild = require('../models/Guild');

module.exports = async (client, message) => {
    if(message.channel.type === "dm" || message.author.bot) return;
    if(message.guild.id === "781912828063907900" || message.channel.id === "787070110832918608") {

    if(!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES") || !message.guild.me.permissionsIn(message.channel).has("READ_MESSAGE_HISTORY")) return message.author.send(`⚠️ ${message.author}, je n'ai pas les permissions de parler ou de voir l'historique de message dans ce salon !`).catch(() => {});

    if(!message.member) await message.guild.fetchMember(message.author);

    if(message.content.includes(client.token)) {
        return message.delete().then(() => client.users.cache.get(client.config.owner.id).send("Tu devrais regen ton token. C'est juste un conseil."));
    }

    const data = await client.getGuild(message.guild);
    if(!data) {  
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle('Merci de m\'avoir ajouté à votre serveur !')
            .setDescription(`@Mentionnez-moi pour avoir de l'aide !`)
            .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        message.channel.send(welcomeEmbed);

        return await client.createGuild({ id: message.guild.id });
    }

    const p = data.members.map(m => m.id).indexOf(message.member.id);
    const userData = data.members[p];

    if(message.guild && p == -1) {
        Guild.updateOne({
            id: message.guild.id
        },
        { 
            $push: {
                members: {
                    id: message.member.id,
                    exp: 0,
                    level: 0
                }
            }
        }).then(() => {});
    }

    const prefixes = [`<@!${client.user.id}> `, `<@${client.user.id}> `, data.prefix]
    let prefix = null;
    prefixes.forEach(p => {
        if(message.content.startsWith(p)) {
            prefix = p;
        }
    })

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        message.channel.send(`Hey ${message.author} ! Mon préfixe est \`${data.prefix}\` dans ce serveur, fais \`${data.prefix}help\` pour avoir de l'aide !`);
    }

    if(data.plugins.protection.antilink === true) {
        if(message.content.match(/(discord|\.gg\/.+|discordapp\.com\/invite\/.+|discord\.com\/invite\/.+)/g)) {
            if(!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) 
            return message.delete().then(() => {
                if(data.plugins.logs.enabled && data.plugins.logs.channel) {
                    message.guild.channels.cache.get(data.plugins.logs.channel).send({
                        embed: {
                            color: 'RED',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${message.author} a envoyé une pub dans ${message.channel}! \nElle a donc été supprimée.`,
                            fields: [
                                {
                                    name: "Message d'origine",
                                    value: message.content
                                }
                            ],
                            footer: {
                                text: client.config.embed.footer,
                                icon_url: client.user.displayAvatarURL()
                            }
                        }
                    })
                }
            })
        }
    }

    if(!message.content.startsWith(prefix) || message.webhookID) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;

    if(command.help.botPerms.length > 0) {
        if(!message.guild.me.permissionsIn(message.channel).has(command.help.botPerms)) {
            return message.channel.send(`⚠️ ${message.author}, je n\'ai pas les permissions nécessaires pour faire cette commande. \nJ\'ai besoin des permissions suivantes: ${command.help.botPerms.map(perm => `\`${perm}\``).join(', ')}`)
        }
    }

    if(command.help.memberPerms.length > 0) {
        if(!message.member.permissionsIn(message.channel).has(command.help.memberPerms)) {
            return message.channel.send(`⚠️ ${message.author}, vous n\'avez les permissions nécessaires pour faire cette commande!`);
        }
    }

    if(command.help.args && !args.length) {
        return message.channel.send({
            embed: {
                color: "#FF0000",
                author: {
                    name: message.author.username,
                    icon_url: message.author.displayAvatarURL({ dynamic: true })
                },
                description: `⚠️ Vous n'utilisez pas la commande correctement. \nFaites **${data.prefix}help ${commandName}** pour voir comment l'utiliser.`,
                footer: {
                    text: client.config.embed.footer,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
    }

    if(!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Discord.Collection());
    }

    const tStamps = client.cooldowns.get(command.help.name);
    const cdAdmount = (command.help.cooldown || 0) * 1000;

    if(tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAdmount;

        if(Date.now() < cdExpirationTime) {
            timeLeft = (cdExpirationTime - Date.now()) / 1000;
            return message.channel.send(`⚠️ Attendez encore **${timeLeft.toFixed(0)}s** avant de réutiliser cette commande!`)
            .then(async msg => {
                await msg.delete({ timeout: 5000 });
            }).catch(() => {});
        }
    }

    tStamps.set(message.author.id, Date.now());
    setTimeout(() => tStamps.delete(message.author.id), cdAdmount);

    try {
        command.run(client, message, args, data, userData);  
    } catch (error) {
        console.log(error.message);
        message.channel.send(`Une erreur est survenue lors de l\'exécution de la commande. \n\`\`\`js\n${error.message}\n\`\`\``);
        client.channels.cache.get(client.config.support.logs).send(`Une erreur est survenue lors de la commande ${commandName}: \n\`\`\`js\n${error.message}\n\`\`\``);
    }
    } else return message.channel.send('ℹ️ **Le bot n\'est pas encore disponible publiquement, allez sur notre support pour en savoir d\'avantage.** \nhttps://discord.com/invite/SSWQamBCFE');
}