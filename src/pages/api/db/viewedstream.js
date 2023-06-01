import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { addViewedStream } from "@mongo/user/addViewedStream";

export default withApiAuthRequired(async function handler(req, res) {
    const { streamid } = req.body;
    const { user } = await getSession(req, res);

    // console.log({
        context: 'viewedstream',
        streamid,
        user
    })

    let status = 201;
    let response = {};
    try {
        response = await addViewedStream(user.email, streamid);
    } catch (error) {
        // console.log(error);
        status = 500;
    }

    // console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).end();
});