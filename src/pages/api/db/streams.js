import {addStream} from "@mongo/Stream/addStream";
import {withApiAuthRequired} from "@auth0/nextjs-auth0";


export default withApiAuthRequired(async function handler(req, res) {
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
})
