const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

module.exports = mongoose.model("Guild", new Schema(
    {
        _id: Schema.Types.ObjectId,
        id: String,
        lang: {
            type: String,
            default: config.defaultsSettings.lang
        },
        prefix: {
            type: String,
            default: config.prefix
        },
        members: [],
        plugins: {
            type: Object,
            default: {
                protection: {
                    raidmode: false,
                    antigiverole: false,
                    antiban: false,
                    antilink: false,
                    betterprotection: false
                },
                welcome: {
                    enabled: false,
                    message: config.defaultsSettings.welcomeMessage,
                    channel: null
                },
                goodbye: {
                    enabled: false,
                    message: config.defaultsSettings.goodbyeMessage,
                    channel: null
                },
                logs: {
                    enabled: false,
                    channel: null
                },
                autorole: {
                    enabled: false,
                    role: null
                },
                suggestion: {
                    enabled: false,
                    channel: null
                },
                economy: {
                    enabled: true,
                    currency: "$"
                },
                levels: {
                    enabled: true,
                    level_up_channel: null,
                    roles_rewards: []
                }
            }
        },
        muterole: {
            type: String,
            default: null
        },
        lastBanTimestamp: {
            type: Number,
            default: null
        },
        lastBanExecutor: {
            type: String,
            default: null
        }
    }
))