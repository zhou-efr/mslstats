import Stream from './StreamModel';
import dbConnect from './dbConnect';

export const getStreams = async () => {
    try {
        await dbConnect();

        const streams = await Stream.find({});
        return streams;
    } catch (error) {
        throw Error(`Error while retreiving Streams: ${error}`);
    }
}