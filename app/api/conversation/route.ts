import { increaseApilimit, checkApilimit } from "@/lib/api-limit";


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function POST(req: Request) {
    try {
        const freeTrial = await checkApilimit();
        if (!freeTrial) {
            return new Response("Free trial is over", { status: 403 })
        }
        const body = await req.json();
        const { messages } = body;
        const chat = model.startChat({ history: messages });

        const result1 = await chat.sendMessage(
            messages[messages.length - 1].parts[0].text
        );
        await increaseApilimit();
        return new Response(JSON.stringify({ role: "model", parts: [{ text: result1.response.text() }] }), { status: 200 });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    POST
}