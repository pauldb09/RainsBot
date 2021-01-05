const ms = require('ms');

module.exports.run = (client, message, args, data) => {
    const time = args[0];
    if(!time || isNaN(ms(time))) return message.channel.send(`Veuillez spécifier un temps valide. \nUtilisation de la commande: \`${data.prefix}start ${client.commands.get('start').help.usage}\` \n**Exemple**: \`${data.prefix}start 1d 1 Nitro Classic 1 mois !!!\``);

    if(ms(time) > ms("15d") || ms(time) < ms("3s")) return message.channel.send('⚠️ Le temps ne peut pas être supérieur à 15 jours ou inférieur à 3s');

    const winnerCount = args[1];
    if(!winnerCount || isNaN(parseInt(winnerCount))) return message.channel.send(`Veuillez spécifier un nombre de gagnants. \nUtilisation de la commande: \`${data.prefix}start ${client.commands.get('start').help.usage}\` \n**Exemple**: \`${data.prefix}start 1d 1 Nitro Classic 1 mois !!!\``);

    if(winnerCount > 10 || winnerCount < 1) return message.channel.send('⚠️ Veuillez spécifier un nombre de gagnants entre 1 et 10!');

    const prize = args.slice(2).join(" ");
    if(!prize) return message.channel.send(`Veuillez spécifier un prix! \Utilisation de la commande: \`${data.prefix}start ${client.commands.get('start').help.usage}\` \n**Exemple**: \`${data.prefix}start 1d 1 Nitro Classic 1 mois !!!\``);

    if(prize.length > 50 || prize.length < 3) return message.channel.send('⚠️ Le nom du prix doit faire entre 3 et 50 caractères!');

    client.giveawaysManager.start(message.channel, {
        time: ms(args[0]),
        prize: args.slice(2).join(" "),
        winnerCount: parseInt(args[1]),
        messages: {
            giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
            giveawayEnded: '🎉🎉 **Giveaway terminé** 🎉🎉',
            timeRemaining: 'Temps restant: **{duration}**',
            inviteToParticipate: 'Réagissez avec 🎉 pour participer!',
            winMessage: '🎉 Félicitations, {winners}! Tu as gagné **{prize}**!',
            noWinner: 'Giveaway, annulé. Personne n\'a participé :(',
            winners: 'gagnant(s)',
            endedAt: 'Terminé',
            hostedBy: 'Giveaway par: {user}',
            units: {
                seconds: 'secondes',
                minutes: 'minutes',
                hours: 'heures',
                days: 'jours'
            }	
        }
    })
}

module.exports.help = {
    name: "start",
    aliases: ["start", "gstart", "g-start" ,"giveawaystart", "giveaway-start", "giveaway", "giveaways"],
    category: "Giveaways",
    description: "Lancer un giveaway",
    usage: "<temps> <gagnant(s)> <prix>",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["EMBED_LINKS", "ADD_REACTIONS"],
    args: false
}