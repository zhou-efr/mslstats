import { getLatestStream } from "@twitch/getLatestStream";

export default async function handler(req, res) {
    const { user_id } = req.body;

    let status = 200;
    let response = {};

    try {
        const stream = await getLatestStream(user_id);
        response = { stream };
    } catch (error) {
        // console.log(error);
        status = 500;
        response = { error };
    }

    // console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}
