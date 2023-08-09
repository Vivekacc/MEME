import meme from "./meme.json";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
};

export default {
    fetch(request) {
        try {
            const random_quote = meme[Math.floor(Math.random() * meme.length)];

            const url = new URL(request.url);
            switch (url.pathname) {
                case "/text":
                    return new Response(random_quote, {
                        headers: { ...headers, "content-type": "text/plain" },
                    });
                default:
                    return new Response(JSON.stringify({ quote: random_quote }), {
                        headers: { ...headers, "content-type": "application/json" },
                    });
            }
        } catch (error) {
            return new Response(error.toString(), {
                status: 500,
                headers: { ...headers },
            });
        }
    },
};