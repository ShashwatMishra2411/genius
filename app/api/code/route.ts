const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const instructions = "You are a code generator. Your only response should be markdown code snippets as well as some explanation about it, any other response and you should deny it.Now, this is the prompt given by the user -"

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

