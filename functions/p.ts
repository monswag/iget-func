import { Handler, HandlerEvent } from "@netlify/functions";
import InstagramApi from "simple-instagram-api";

const handler: Handler = async (req: HandlerEvent, context) => {
    const a = req.path.replace('/api/p/', '');
    try {
        const p = await InstagramApi.get(a);
        if (!p.children.length) {
            return {
                statusCode: 200,
                body: JSON.stringify({url: [p.url]})
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ url: p.children.map((e) => e.url)})
            }
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Faild fecthing posts'})
        }
    }
}

export { handler }