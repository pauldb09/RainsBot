module.exports.run = async (client, message, args, data) => {
    let plugin = args[0];
    if(!plugin) return message.channel.send('⚠️ Ce plugin n\'existe pas. Voici la liste des plugins: `welcome`, `goodbye`, `logs`, `autorole`, `suggestion`. \nVous ne trouvez pas ce que vous voulez ? Faites `' + data.prefix + 'config` pour voir les autres configurations. Le module de protection s\'active séparement via les commandes `raidmode`, `antigiverole`, `antiban`, `antilink`.');

    switch (plugin.toLowerCase()) {
        case "protection": {
            message.channel.send('ℹ️ Le plugin protection n\'est pas activable. Vous pouvez activer le raidmode, l\'antigiverole, l\'antilien ou l\'antiban séparément via leur commande respective (ex: `' + data.prefix + 'raidmode`)');
            break;
        }
        case "welcome": {
            if(data.plugins.welcome.enabled) {
                data.plugins.welcome.enabled = false;

                data.markModified("plugins.welcome.enabled");
                data.save();

                message.channel.send('✅ Le plugin `welcome` a bien été **désactivé**.')
            } else {
                data.plugins.welcome.enabled = true;

                data.markModified("plugins.welcome.enabled");
                data.save();

                message.channel.send('✅ Le plugin `welcome` a bien été **activé**. Faites `' + data.prefix + 'welcome <message | channel | test>` pour modifier le message et le salon de bienvenue!');
            }

            break;
        };
        case "goodbye": {
            if(data.plugins.goodbye.enabled) {
                data.plugins.goodbye.enabled = false;

                data.markModified("plugins.goodbye.enabled");
                data.save();

                message.channel.send('✅ Le plugin `goodbye` a bien été **désactivé**.');
            } else {
                data.plugins.goodbye.enabled = true;

                data.markModified("plugins.goodbye.enabled");
                data.save();

                message.channel.send('✅ Le plugin `goodbye` a bien été **activé**. Faites `' + data.prefix + 'goodbye <message | channel | test>` pour modifier le message et le salon d\'aurevoir!');
            }

            break;
        };
        case "logs": {
            if(data.plugins.logs.enabled) {
                data.plugins.logs.enabled = false;

                data.markModified("plugins.logs.enabled");
                data.save();

                message.channel.send('✅ Le plugin `logs` a bien été **désactivé**.');
            } else {
                if(!message.guild.me.hasPermission("EMBED_LINKS") || !message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send('J\'ai besoin des permissions Intégrer des liens et Voir les logs du serveur pour pouvoir activer les logs!');

                data.plugins.logs.enabled = true;

                data.markModified("plugins.logs.enabled");
                data.save();

                message.channel.send('✅ Le plugin `logs` a bien été **activé**. Faites `' + data.prefix + 'logschannel` pour modifier le salon de logs!');
            }

            break;
        };
        case "autorole": {
            if(data.plugins.autorole.enabled) {
                data.plugins.autorole.enabled = false;

                data.markModified("plugins.autorole.enabled");
                data.save();

                message.channel.send('✅ Le plugin `autorole` a bien été **désactivé**.');
            } else {
                if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('J\'ai besoin des permissions Gérer les rôles pour pouvoir activer l\'autorole!');

                data.plugins.autorole.enabled = true;

                data.markModified("plugins.autorole.enabled");
                data.save();

                message.channel.send('✅ Le plugin `autorole` a bien été **activé**. Faites `' + data.prefix + 'autorole` pour modifier le role!');
            }

            break;
        };
        case "suggestion": {
            if(data.plugins.suggestion.enabled) {
                data.plugins.suggestion.enabled = false;

                data.markModified("plugins.suggestion.enabled");
                data.save();

                message.channel.send('✅ Le plugin `suggestion` a bien été **désactivé**.');
            } else {
                data.plugins.suggestion.enabled = true;

                data.markModified("plugins.suggestion.enabled");
                data.save();

                message.channel.send('✅ Le plugin `suggestion` a bien été **activé**. Faites `' + data.prefix + 'suggestion-channel` pour modifier le salon!');
            }

            break;
        }
        default: {
            message.channel.send('⚠️ Ce plugin n\'existe pas. Voici la liste des plugins: `welcome`, `goodbye`, `logs`, `autorole`, `suggestion`. \nVous ne trouvez pas ce que vous voulez ? Faites `' + data.prefix + 'config` pour voir les autres configurations. Le module de protection s\'active séparement via les commandes `raidmode`, `antigiverole`, `antiban`, `antilink`.');
        }
    }
}

module.exports.help = {
    name: "enable",
    aliases: ["enable", "enable-plugin", "enableplugins", "enable-plugins", "enableplugin"],
    category: 'Config',
    description: "Activer/Désactiver certains plugins",
    usage: "<plugin>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}