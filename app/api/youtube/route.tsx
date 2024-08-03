import ytdl from "ytdl-core";
import he from "he";
import axios from "axios";
import { NextRequest } from "next/server";
import { increaseApilimit, checkApilimit } from "@/lib/api-limit";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const gemini = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const videoURL = request?.link;
    console.log(videoURL);
    const info = await ytdl.getInfo(videoURL);

    // Extracting title
    const title = info.videoDetails.title;
    console.log("Title:", title);

    // Extracting thumbnail
    const thumbnails = info.videoDetails.thumbnails;
    const thumbnailUrl = thumbnails[thumbnails.length - 1].url;
    console.log("Thumbnail URL:", thumbnailUrl);
    let plainText = "";
    // Extracting transcript
    const captions = info.player_response.captions;
    if (captions) {
      const transcriptTrack =
        captions.playerCaptionsTracklistRenderer.captionTracks.find(
          (track: any) => track.languageCode === "en"
        );

      if (transcriptTrack) {
        const transcriptUrl = transcriptTrack.baseUrl;

        // Fetch transcript
        const response = await axios.get(transcriptUrl);
        const transcript = response.data;
        const textRegEx = /<text[^>]*>(.*?)<\/text>/g;
        let match;

        // Iterate over all matches of <text>...</text> and extract the content
        while ((match = textRegEx.exec(transcript)) !== null) {
          plainText += he.decode(match[1]) + " "; // Decode HTML entities
        }
        console.log("Transcript:", plainText.trim());
        const instructions =
          "You are a youtube video summariser and you have to summarise the video transcript in 2 paragraphs.This is the transcript - ";
        const instructions2 = `You are a youtube video misleading detector by comparing the transcript to the video title. This is the transcript - ${plainText.trim()} and this is the video title - ${title}`;
        const prompt = instructions + plainText.trim();
        let res1 = await gemini(prompt);
        let res2 = await gemini(instructions2);
        return new Response(
          JSON.stringify({
            title,
            thumbnailUrl,
            transcript: plainText.trim(),
            summary: res1,
            clickbait: res2,
            videoURL: videoURL,
          }),
          { status: 200 }
        );
      } else {
        return new Response("English transcript not available.", {
          status: 404,
        });
        // console.log("English transcript not available.");
      }
    } else {
      return new Response("Transcripts not available for this video.", {
        status: 404,
      });
      // console.log("Transcripts not available for this video.");
    }
  } catch (err) {
    return new Response("Error fetching video details.", { status: 500 });
    // console.error("Error fetching video details:", err);
  }
}
