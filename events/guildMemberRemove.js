module.exports = async (client, member) => {
    const data = await client.getGuild(member.guild);

    if(!data.plugins.goodbye.enabled) return;

    let goodbyeMsg = data.plugins.goodbye.message
    if(goodbyeMsg.includes('{user}')) goodbyeMsg = goodbyeMsg.replace('{user}', member);
    if(goodbyeMsg.includes('{guildName}')) goodbyeMsg = goodbyeMsg.replace('{guildName}', member.guild.name);
    if(goodbyeMsg.includes('{memberCount}')) goodbyeMsg = goodbyeMsg.replace('{memberCount}', member.guild.memberCount);
    if(goodbyeMsg.includes('{username}')) goodbyeMsg = goodbyeMsg.replace('{username}', member.user.username);
    if(goodbyeMsg.includes('{usertag}')) goodbyeMsg = goodbyeMsg.replace('{usertag}', member.user.tag);

    if(!data.plugins.goodbye.channel) {
        await member.send(goodbyeMsg).catch(() => {});
    } else {
        member.guild.channels.cache.get(data.plugins.goodbye.channel).send(goodbyeMsg);
    }
}