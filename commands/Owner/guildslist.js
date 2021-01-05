/**
 * Script repris de https://github.com/Androz2091/AtlantaBot/blob/master/commands/Owner/servers-list.js
 */


const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    if(message.author.id !== client.config.owner.id) return client.emit('ownerOnly', message);

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description = `Serveurs: ${client.guilds.cache.size}\n\n`+
    client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres (${r.id})`).slice(0, 10).join("\n");

    const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`PAGE: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
        .setDescription(description)
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        .setTimestamp();

    const msg = await message.channel.send(embed);
        
	await msg.react("⬅");
	await msg.react("➡");

    const c = msg.createReactionCollector((_reaction, user) => user.id === message.author.id);

    c.on("collect", async reaction => {
        if(reaction.emoji.name === "⬅") {
            i0 = i0 - 10;
            i1 = i1 - 10;
            page = page - 1

            if(i0 < 0) return;
            if(!i0 || !i1) return;

            description = `Serveurs: ${client.guilds.cache.size}\n\n` + client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(r => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`).slice(i0, i1).join("\n");

            embed.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
                .setDescription(description);

            msg.edit(embed);
        }

        if(reaction.emoji.name === "➡") {
            i0 = i0 + 10;
            i1 = i1 + 10;
            page = page + 1

            if(i1 > client.guilds.cache.size + 10) return;
            if(i0 < 0) return;
            if(!i0 || !i1) return;

            description = `Serveurs: ${client.guilds.cache.size}\n\n` + client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres (${r.id})`).slice(i0, i1).join("\n");

            embed.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
                .setDescription(description);

            msg.edit(embed);
        }

        await reaction.users.remove(message.author.id);
    })
}

module.exports.help = {
    name: "guildslist",
    aliases: ["guildslist", "glist"],
    category: 'Owner',
    description: "Afficher la liste des serveurs",
    usage: "",
    cooldown: 3,
    memberPerms: [],
    botPerms: ["EMBED_LINKS", "ADD_REACTIONS"],
    args: false
}