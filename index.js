import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { google } from "googleapis";
import { schedule } from "node-cron";

config();

let latestVideo = "";

const discordToken = process.env.DISCORD_TOKEN;
const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
const youtubeChannelID = process.env.YOUTUBE_CHANNEL_ID;
const discordChannelID = process.env.DISCORD_CHANNEL_ID;

if (!discordToken || !youtubeChannelID || !discordChannelID || !youtubeAPIKey) {
  console.error(
    "As variáveis de ambiente não estão configuradas corretamente."
  );
  process.exit(1);
}

const discordClient = new Client({
  intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
});

const youtubeCLient = google.youtube({
  version: "v3",
  auth: youtubeAPIKey,
});

discordClient.login(discordToken);

discordClient.on("ready", () => {
  console.log(`Bot online, logado como: ${discordClient.user.tag}`);
  checkNewVideo();
  schedule("0 */1 * * *", checkNewVideo);
});

async function checkNewVideo() {
  try {
    const response = await youtubeCLient.search
      .list({
        channelId: youtubeChannelID,
        order: "date",
        part: "snippet",
        type: "video",
        maxResults: "1",
      })
      .then((res) => res);

    const latestVideoReq = response.data.items[0];

    if (latestVideoReq?.id?.videoId != latestVideo) {
      latestVideo = latestVideoReq.id.videoId;

      const videoURL = `https://www.youtube.com/watch?v=${latestVideo}`;
      const message = `Insert your message here!!!!`;
      const channel = discordClient.channels.cache.get(discordChannelID);
      channel.send(`${message}\n${videoURL}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
