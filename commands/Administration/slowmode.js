const ms = require('ms');

module.exports.run = (client, message, args) => {
    const newTime = (args[0]);
    const oldTime = message.channel.rateLimitPerUser;

    if(!message.member.permissionsIn(message.channel).has('MANAGE_CHANNELS')) return message.channel.send('⚠️ Vous n\'avez pas les permissions nécessaires pour modifier ce salon.');

    if(!newTime) return message.channel.send(`⚠️ Temps invalide. Spécifiez un temps sous ces formes: \`5s\`, \`10min\`, \`4h\`, \`remove\`.`)

    if(ms(newTime) == 0 || newTime == "remove" || newTime == "off") {
        message.channel.setRateLimitPerUser(0);
        return message.channel.send('✅ Le slowmode du salon a été retiré.');
    }

    if(!newTime || isNaN(ms(newTime))) return message.channel.send(`⚠️ Temps invalide. Spécifiez un temps sous ces formes: \`5s\`, \`10min\`, \`4h\`, \`remove\`.`)

    if(ms(newTime) / 1000 == oldTime) return message.channel.send(`⚠️ Le slowmode de ce salon est déjà défini sur ${ms(ms(newTime))}.`);

    if(ms(newTime) < 1000) return message.channel.send('⚠️ Temps invalide. Le temps doit être supérieur ou égal à 1s. ');
    if(ms(newTime) / 1000 > 21600) return message.channel.send('⚠️ Impossible de mettre un slowmode supérieur à 6h.');

    message.channel.setRateLimitPerUser(ms(newTime) / 1000).catch(err => {
        console.log(err);
        message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    })
    message.channel.send(`✅ Le slowmode du salon a été défini sur **${ms(ms(newTime))}**.`);
}

module.exports.help = {
    name: "slowmode",
    aliases: ["slowmode", "slow-mode", "setslowmode", "set-slow-mode"],
    category: 'Administration',
    description: "Modifier le slowmode du salon dans lequel vous êtes",
    usage: "<temps | off>",
    cooldown: 5,
    memberPerms: ["MANAGE_CHANNELS"],
    botPerms: ["MANAGE_CHANNELS"],
    args: true
}