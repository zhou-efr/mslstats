import Stream from './StreamModel';
import dbConnect from '../dbConnect';
import {updateGame} from "@mongo/Game/updateGame";

export const addStream = async (newStream) => {
    try {
        await dbConnect();

        const stream = Stream.create(newStream);
        await updateGame(stream);

        return stream
    } catch (error) {
        throw Error(`Error while adding a Stream: ${error}`);
    }
}