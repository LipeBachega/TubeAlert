import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { google } from "googleapis"
import { schedule } from "node-cron";

config()

let latestVideo = ""

const discordClient = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})

const youtubeCLient = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY
})

discordClient.login(process.env.DISCORD_TOKEN)

discordClient.on("ready", () => {
    console.log(`Bot online, logado como: ${discordClient.user.tag}`);
    checkNewVideo()
    schedule("0 */1 * * *", checkNewVideo)

})

async function checkNewVideo() {


    try {

        const response = await youtubeCLient.search.list({
            channelId: "UCLRYN-g8AMUxKKBnRn6umhw",
            order: "date",
            part: "snippet",
            type: "video",
            maxResults: "1"
        }).then(res => res)

        console.log("Opa");
        const latestVideoReq = response.data.items[0]


        if (latestVideoReq?.id?.videoId != latestVideo) {

            latestVideo = latestVideoReq.id.videoId

            const videoURL = `https://www.youtube.com/watch?v=${latestVideo}`
            const message = `Novo video no canal, venha conferir!`
            const channel = discordClient.channels.cache.get("1216849917977428049")
            channel.send(`${message}\n${videoURL}`)


        }

    } catch (error) {
        console.log(`Error: ${error}`);
    }
} 
