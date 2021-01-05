module.exports.run = async (client, message, args, data) => {
    const user = args[0];
    if(!user || isNaN(user)) return message.channel.send(`⚠️ Veuillez renseigner l'id d'un membre.`);

    const reason = (args.slice(1).join(" ") || "Pas de raison spécifiée");

    if(!isNaN(user)) {
        const toUnban = await client.users.fetch(user).catch(() => {});
        if(!toUnban) return message.channel.send(`⚠️ Cet utilisateur n'existe pas.`);

        const bansList = await message.guild.fetchBans();
        const isBanned = await bansList.find(u => u.user.id === toUnban.id);

        if(!isBanned) return message.channel.send(`⚠️ Cet utilisateur n'est pas banni.`);

        message.guild.members.unban(toUnban, reason).catch(() => {});
        message.channel.send(`✅ ${toUnban} s'est fait débannir pour la raison suivante: **${reason}**`);
    }
}

module.exports.help = {
    name: "unban",
    aliases: ["unban"],
    category: "Moderation",
    description: "Débannir un membre",
    usage: "<id du membre> [raison]",
    cooldown: 5,
    memberPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    args: true
}