const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const instructions = "You are a website builder. Using the following prompt, generate a complete HTML document that includes any necessary style and script tags. Ensure the design is visually appealing and well-structured. When making changes, integrate the new instructions with the previously generated code to maintain coherence and continuity. Return only the HTML code. Here is the prompt:";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;
        console.log(messages)
        messages[messages.length - 1].parts[0].text = instructions + " " + messages[messages.length - 1].parts[0].text;
        const chat = model.startChat({ history: messages });

        const result1 = await chat.sendMessage(
            messages[messages.length - 1].parts[0].text
        );
        console.log(result1.response.text());
        return new Response(JSON.stringify({ role: "model", parts: [{ text: result1.response.text() }] }), { status: 200 });
    } catch (error) {
        console.log(error)
    }
}

