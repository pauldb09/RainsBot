module.exports = client => {
    function randomStatus() {
        const status = client.config.status
        const rstatus = Math.floor(Math.random() * status.length);
        const toDisplay = status[rstatus].name.replace("{serversCount}", client.guilds.cache.size).replace("{usersCount}", client.getAllUsers());

        client.user.setActivity(toDisplay, { type: status[rstatus].type });
    }
    setInterval(randomStatus, 30000);

    console.log(`Connecté avec succès sur ${client.user.tag}`);
    client.channels.cache.get(client.config.support.logs).send('✅ **Le bot est connecté!**');
}
