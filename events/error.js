module.exports = (client, error) => {
    console.log(error.message);
    client.channels.cache.get(client.config.support.logs).send(`[${moment(new Date()).locale("fr").format('lll')}] [ERROR] \`\`\`js\n${error.message}\n\`\`\``)
}