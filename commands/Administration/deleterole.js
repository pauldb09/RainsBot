module.exports.run = (client, message, args) => {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.channel.send('⚠️ Veuillez spécifier un rôle a supprimer.');

    if(message.author.id != message.guild.ownerID) {
        if(role.position >= message.member.roles.highest.position) return message.channel.send('⚠️ Vous ne pouvez pas supprimer ce rôle.');
    }

    if(!role.editable || role.id === message.guild.roles.everyone.id || role.deleted) return message.channel.send('⚠️ Je ne peux pas supprimer ce role, vérifiez que le rôle a supprimer est en dessous du mien et réessayez.');

    role.delete().catch(err => {
        console.log(err);
        message.channel.send(`❌ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    })

    message.channel.send(`✅ Le rôle **@${role.name}** a été supprimé.`);
}

module.exports.help = {
    name: "deleterole",
    aliases: ["deleterole", "delete-role", "roledelete", "role-delete"],
    category: 'Administration',
    description: "Supprimer un role",
    usage: "<role>",
    cooldown: 15,
    memberPerms: ["MANAGE_ROLES"],
    botPerms: ["MANAGES_ROLES"],
    args: true
}