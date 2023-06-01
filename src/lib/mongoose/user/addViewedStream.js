import dbConnect from "@mongo/dbConnect";
import {getUser} from "@mongo/user/getUser";

export async function addViewedStream(email, streamer_id) {
    try {
        await dbConnect();

        const user = await getUser(email);
        let viewed_streams = user.view_streams;

        if (!viewed_streams) {
            viewed_streams = [];
        }

        if (!viewed_streams.includes(streamer_id)) {
            viewed_streams.push(streamer_id);
        }

        console.log({
            context: 'addViewedStream',
            viewed_streams,
            user
        })

        await user.updateOne({view_streams: viewed_streams});

        return user;
    } catch (error) {
        throw Error(`Error while adding viewed stream: ${error}`);
    }
}