import Stream from './StreamModel';
import dbConnect from './dbConnect';

export const addStream = async (newStream) => {
    try {
        await dbConnect();

        const stream = Stream.create(newStream)
        return stream
    } catch (error) {
        throw Error(`Error while adding a Stream: ${error}`);
    }
}