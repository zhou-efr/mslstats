import { getToken } from "@twitch/getToken";

export default async function handler(req, res) {
    let status = 200;
    let response = {};
    try {
        const token = await getToken();
        response = { token };
    } catch (error) {
        // console.log(error);
        status = 500;
        response = { error };
    }

    // console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).json(response);
}
