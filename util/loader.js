const fs = require('fs');

const loadCommands = (client, dir = "./commands/") => {
    fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const fileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(fileName.help.name, fileName);
        }
    })
    console.log(`${client.commands.size} commandes chargées`);
}

const loadEvents = (client, dir = "./events") => {
    fs.readdir(dir, (error, f) => {
        if(error) console.log(error);
        console.log(`${f.length} évènements en chargement`);

        f.forEach((file) => {
            const events = require(`../${dir}/${file}`);
            const evtName = file.split(".")[0];

            client.on(evtName, events.bind(null, client));
        })
    })
}

module.exports = {
    loadCommands,
    loadEvents
}