import { getLatestStream } from '@/twitch/getLatestStream'

export default async function handler(req, res) {
    const { channel } = req.body;

    let status = 200;
    let response = {};

    try {
        const stream = await getLatestStream(channel);
        response = { stream };
    } catch (error) {
        console.log(error);
        status = 500;
        response = { error };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}
