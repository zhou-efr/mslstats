import { getTwitchUser } from "@twitch/getTwitchUser";

export default async function handler(req, res) {
    const { username } = req.body;

    let status = 200;
    let response = {};

    try {
        const user = await getTwitchUser(username);
        response = { user };
    } catch (error) {
        console.log(error);
        status = 500;
        response = { error };
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}
