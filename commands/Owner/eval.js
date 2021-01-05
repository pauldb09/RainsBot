const beautify = require("beautify");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (
        message.author.id !== client.config.owner.id
    ) return client.emit('ownerOnly', message);
    const content = message.content.split(" ").slice(1).join(" ");
    if(!content) return message.channel.send('⚠️ Indiquez du code à évaluer!');

    const result = new Promise((resolve) => resolve(eval(content)));

    return result
    .then((output) => {
        if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
        }
        if (
            output.includes(client.token)
        ) {
            output = output.replace(client.token, "T0K3N");
        }
        if (
            output.includes(process.env.DBCONNECTION)
        ) {
            output = output.replace(process.env.DBCONNECTION, "DB+CONNECTION_SRV");
        }

        const embed = new MessageEmbed()

            .setTitle(`✅ Succès ! \nRéponse :`)
            .setDescription(`\`\`\`js\n${output}\n\`\`\``)
            .addField(
                "Évaluation :",
                `\`\`\`js\n${beautify(content, { format: "js" })}\n\`\`\``
            )
            .addField("Type :", typeof output);

        if (embed.description.length > 1000)
            embed.description = `\`\`\`js\n${
                output.slice(0, 999) + "... \net plus..."
            }\n\`\`\``;

        return message.channel.send(embed);
    })
    .catch((err) => {
        err = err.toString();
    if (
        err.includes(client.token)
    ) {
        err = err.replace(client.token, "T0K3N");
    }

    const embed = new MessageEmbed()

        .setTitle(`⚠️ ERREUR :`)
        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
        .addField(
            "Évaluation",
            `\`\`\`js\n${beautify(content, { format: "js" })}\n\`\`\``
        );

    if (embed.description.length > 1000)
        embed.description = `\`\`\`js\n${
            output.slice(0, 999) + "... \net plus..."
        }\n\`\`\``;

        message.channel.send(embed);
    })
}

module.exports.help = {
    name: "eval",
    aliases: ["eval", "e"],
    category: 'Owner',
    description: "Renvoie un code JavaScript testé",
    usage: "<code>",
    cooldown: 3,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}
