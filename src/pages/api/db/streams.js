import { addStream } from "@mongo/addStream";

export default async function handler(req, res) {
    const stream = req.body;

    let status = 201;
    let response = {};
    try {
        await addStream(stream);
    } catch (error) {
        console.log(error);
        status = 500;
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).end();
}
