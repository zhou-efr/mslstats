import dbConnect from '../dbConnect';
import User from './UserModel';

export async function addFollowedStream(email, streamer_id, streamer_name){
    try {
        await dbConnect();
        await User.findOneAndUpdate({ email }, { $push: { followed_streams: {streamer_id, streamer_name} } });
    } catch (error) {
        throw Error(`Error while adding followed stream: ${error}`);
    }
}
