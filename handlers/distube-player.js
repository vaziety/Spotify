const DisTube = require("distube")
const config = require("../config.json")
const { MessageEmbed } = require("discord.js");
const SpotifyPlugin = require("@distube/spotify")
const { format } = require("../handlers/functions")

module.exports = (client) => {
  client.distube = new DisTube(client, {
    searchSongs: false,
    leaveOnEmpty: true,
    leaveOnStop: false,
    plugins: [new SpotifyPlugin()],
    //youtubeCookie: "", YOUR YOUTUBE COOKIE TO PREVENT ERROR 402
    leaveOnFinish: false,
    customFilters: config.filters
  })

// Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

//Distube
  client.distube
    .on("playSong", (message, queue, song) => {
      const embed = new MessageEmbed()
        .setTitle("Playing :notes: " + song.name)
        .setURL(song.url)
        .setColor("RANDOM")
        .addField("Duration", `\`${song.formattedDuration}\``)
        .addField("Queue Status", status(queue))
        .setThumbnail(song.thumbnail)
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
      message.channel.send(embed)
        queue.connection.voice.setSelfDeaf(true)
    })

    .on("addSong", (message, queue, song) => {
      const embeds = new MessageEmbed()
          .setTitle("Song Added :thumbsup: " + song.name)
          .setURL(song.url)
          .setColor("RANDOM")
          .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
          .addField("Duration", `\`${song.formattedDuration}\``)
          .setThumbnail(song.thumbnail)
          .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))

          message.channel.send(embeds)
    })

    .on("playList", (message, queue, playlist, song) => {
      const embeded = new MessageEmbed()
            .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Current Track: ", `[${song.name}](${song.url})`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
            
            message.channel.send(embeded)
            queue.connection.voice.setSelfDeaf(true)
    })

    .on("addList", (message, queue, playlist) => {
      const embededs = new MessageEmbed()
            .setTitle("Added Playlist :thumbsup: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor("RANDOM")
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))

            message.channel.send(embededs)
    })

    .on("searchResult", (message, result) => {
      const embededed = new MessageEmbed()
            .setTitle("**Choose an option from below**")
            .setURL(song.url)
            .setColor("RANDOM")
            .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
            .setFooter(client.user.username, client.user.displayAvatarURL())

            message.channel.send(embededed)
    })

    .on("searchCancel", (message) => {
      const embedededs = new MessageEmbed()
          .setColor("RANDOM")
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`**❌ Search Cancelled**`)

          message.channel.send(embedededs)
    })

    .on("error", (message, e) => {
      console.log(String(e.stack))
      const embds = new MessageEmbed()
          .setColor("RANDOM")
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTitle(`❌ An error occurred`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)

          message.channel.send(embds)
    })
    
          .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 75;
          queue.filter = "lowbass";
    })
}