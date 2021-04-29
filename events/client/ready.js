const { prefix } = require('../../config.json')

module.exports = client => {
  let botStatus = [
    `TEST`,
    `${prefix}help or ${prefix}h`,
    `TEST`,
    `TEST`
]

    setInterval(function() {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, {type: "WATCHING"});

    }, 5000) //Changes status every 5sec

    client.user.setStatus("dnd"); // sets the bots status. [Online - online, Idle - idle, Do Not Disturb - dnd, Offline - offline]
    
  console.log(`My Bot is Online`); // consoles logs this when bot is turned on
   
};
