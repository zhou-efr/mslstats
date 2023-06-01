import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import {getTwitchUser} from "@twitch/getTwitchUser";
import {addFollowedStream} from "@mongo/user/addFollowedStreams";

export default withApiAuthRequired(async function handler(req, res) {
    const {streamer} = req.body;
    const { user } = await getSession(req, res);

    console.log(`user: ${JSON.stringify(user)}`)

    let status = 201;
    let response = {};
    try {
        const { id } = await getTwitchUser(streamer);
        response = await addFollowedStream(user.email, id, streamer);
    } catch (error) {
        console.log(error);
        status = 500;
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).end();
})
