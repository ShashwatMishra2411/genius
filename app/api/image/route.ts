import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body)
    const { prompt, amount, resolution } = body;
    if (!prompt || !amount || !resolution) {
        return new Response("Missing required fields", { status: 400 });
    }
    let width = 512;
    let height = 512;
    let quality = "MID"
    if (resolution === "256x256") {
        width = 256;
        height = 256;
    } else if (resolution === "512x512") {
        width = 512;
        height = 512;
    } else {
        width = 1024;
        height = 1024;
    }
    console.log(prompt, amount, resolution, quality)


    const seed = 42; // Each seed generates a new image variation
    const model = "Boltning"
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    const response = await axios.get(imageUrl);
    return new Response(JSON.stringify({
        role: "model",
        imageUrl: response.config.url
    }), { status: 200 });
}