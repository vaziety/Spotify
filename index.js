const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { token , prefix } = require('./config.json')

const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages


const client = new Discord.Client({
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  disableEveryone: true,
});
//Client variables to use everywhere
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.cooldowns = new Discord.Collection();


["command", "events", "distube-player"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//login into the bot
client.login(token); 