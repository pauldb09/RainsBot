const { MessageEmbed } = require('discord.js');
const emojis = require('../../emojis');

module.exports.run = (client, message, args, data) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user) return message.channel.send('⚠️ Veuillez mentionner un membre à mute dans un vocal.');
    if(user === message.author) return message.channel.send(`⚠️ Vous ne pouvez pas vous mute vous même ${emojis.facepalm}`);
    user = message.guild.member(user);

    if(!user.voice.channel) return message.channel.send('⚠️ Cet utilisateur n\'est pas connecté dans un vocal.');

    if(user.voice.mute) return message.channel.send('⚠️ Cet utilisateur est déjà mute.')

    user.voice.setMute(true).catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n\`\`\``);
    })

    message.channel.send(`✅ ${user} a été mute du salon vocal **${user.voice.channel}**`);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setDescription(`L'utilisateur **${user.user.username}** a été mute du salon vocal **${user.voice.channel}** par ${message.author}`)
                .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
            message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

module.exports.help = {
    name: "voicemute",
    aliases: ["voicemute", "vocmute", "vcmute", "voice-mute"],
    category: "Moderation",
    description: "Rendre muet un membre dans un salon vocal",
    usage: "<membre>",
    cooldown: 5,
    memberPerms: ["MUTE_MEMBERS"],
    botPerms: ["MUTE_MEMBERS", "EMBED_LINKS"],
    args: true
}