import dbConnect from '../dbConnect';
import User from './UserModel';

export async function createUser(email) {
    try {
        await dbConnect();

        const newUser = await User.create({
            email,
            followed_streams: [],
        });

        return newUser;
    } catch (error) {
        throw Error(`Error while creating user: ${error}`);
    }
}