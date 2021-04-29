const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "play",
    aliases: ["wrong", "song"],
    description: "Play a song",
    cooldown: "5",
    run: async (client, message, args) => {
        const nostring = new MessageEmbed()
            .setTitle("Spotify Player")
            .setColor("RANDOM")
            .addField(`${client.prefix.prefix}play <URL>`, "**Spotify is also possible!**")
        const string = args.join(" ")
        if (!string) return message.channel.send(nostring)
        if(!message.guild.me.voice.channel) {
        await message.channel.send(`:thumbsup: **Joined \`${message.member.voice.channel.name}\` and bound to** <#${message.channel.id}>`)
}
        try {
            message.channel.send(":white_check_mark: Loading...")
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`An error occurred!\n\`\`\`\n${e}\n\`\`\``)
        }
    }
}