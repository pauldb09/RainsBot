const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, data) => {
    let toDelete = parseInt(args[0]);
    if(!toDelete || isNaN(toDelete) || toDelete < 1 || toDelete > 100) return message.channel.send(`⚠️ Veuillez indiquer un nombre entre 1 et 100.`);

    await message.delete();

    let messages = await message.channel.messages.fetch({
        limit: Math.min(toDelete, 100),
        before: message.id
    })
    
    if(messages.length == 1) {
        await messages[0].delete().catch(() => {});
    } else {
    await message.channel.bulkDelete(messages, true).catch(err => {
        if(err.code == "50034") return message.channel.send(`⚠️ Impossible de supprimer des messages vieux de plus de 2 semaines.`);
        else {
            if(err.code != "10008");
            console.log(err);
            return message.channel.send(`⚠️ Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
        }
    })
        message.channel.send(`✅ ${toDelete} message supprimés.`);

        if(data.plugins.logs.enabled) {
            if(data.plugins.logs.channel) {
                const embed = new MessageEmbed()
                    .setColor(client.config.embed.color)
                    .setDescription(`${message.author} a supprimé ${toDelete} messages dans ${message.channel}`)
                    .setFooter(client.config.embed.footer, client.user.displayAvatarURL());
                message.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
            }
        }
    }
}

module.exports.help = {
    name: "clear",
    aliases: ["clear", "purge"],
    category: "Moderation",
    description: "Supprimer une certaine quantité de messages entre 1 et 100",
    usage: "<nombre de messages>",
    cooldown: 10,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    args: true
}