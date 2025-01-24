import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";
import { NextRequest,NextResponse } from "next/server";
// Initialize the Gemini API client with your API key
const geminikey = process.env.GEMINI_API_KEY || "AIzaSyCAiImuB3et3shN0ZDEtmYfqtJCKsKsqNU";
const genAI = new GoogleGenerativeAI(geminikey);

export async function POST(req) {
  try {
    const body = await req.json();
    const { youtubeUrl } = body;

    if (!youtubeUrl) {
      return NextResponse.json({ message: "Missing youtubeUrl" }, { status: 400 });
    }

    // Extract video ID from YouTube URL
    const videoId = youtubeUrl.split("v=")[1];
    if (!videoId) {
      return NextResponse.json({ message: "Invalid youtubeUrl" }, { status: 400 });
    }

    // Get the transcript of the video
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);

    // Format transcript to be a single string of text
    const transcript = transcriptData.map((item) => item.text).join(" ");
    if (!transcript) {
      return NextResponse.json({ message: "No transcript found for this YouTube video." }, { status: 400 });
    }

    // Generate content using the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Summarize this YouTube video transcript into a JSON format like this: {title:"",sections:[{subheading:"",points:[{point:""}]}]}. Be sure to use bullet points and use headings to divide the content. Provide a title based on the YouTube video title. Only provide the JSON as the final result:
    
    ${transcript}`;

    const result =  await model.generateContent(prompt);
    console.log("result:",result);
    const response = result.response;
    const text = response.text();
    console.log("text:",text);
    return NextResponse.json(text, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch transcript or summarize video.", error: error.message },
      { status: 500 }
    );
  }
}
