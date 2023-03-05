import dbConnect from '../dbConnect';
import { createUser } from './createUser';
import User from './UserModel';

export async function getUser(email) {
    try {
        await dbConnect();
        let user = await User.findOne({ email });

        if (!user) {
            user = createUser(email)
        }

        return user;
    } catch (error) {
        throw Error(`Error while getting user: ${error}`);
    }
}