const { MessageEmbed } = require("discord.js");
const emojis = require('../../emojis');

module.exports.run = (client, message, args, data) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user) return message.channel.send('⚠️ Veuillez mentionner un membre à kick d\'un vocal.');
    if(user === message.author) return message.channel.send(`⚠️ Vous ne pouvez pas vous kick vous même ${emojis.facepalm}`);
    user = message.guild.member(user);

    if(!user.voice.channel) return message.channel.send('⚠️ Cet utilisateur n\'est pas connecté dans un vocal.');

    user.voice.kick().catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n\`\`\``);
    })

    message.channel.send(`✅ ${user} a été kick du salon vocal **${user.voice.channel}**`)

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`L'utilisateur **${user.user.username}** a été kick du salon vocal **${user.voice.channel}** par ${message.author}`)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

module.exports.help = {
    name: "voicekick",
    aliases: ["voicekick", "vockick", "vckick", "voice-kick"],
    category: "Moderation",
    description: "Expulser un membre d'un salon vocal",
    usage: "<membre>",
    cooldown: 10,
    memberPerms: ["MOVE_MEMBERS"],
    botPerms: ["MOVE_MEMBERS", "EMBED_LINKS"],
    args: true
}