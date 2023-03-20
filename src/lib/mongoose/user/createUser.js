import dbConnect from '../dbConnect';
import User from './UserModel';

export async function createUser(email) {
    try {
        await dbConnect();

        return await User.create({
            email,
            followed_streams: [],
            view_streams: [],
        });
    } catch (error) {
        throw Error(`Error while creating user: ${error}`);
    }
}