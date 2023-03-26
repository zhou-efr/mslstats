import Stream from './StreamModel';
import dbConnect from "@mongo/dbConnect";

export async function getStreamsByIds(ids) {
    try {
        await dbConnect();

        const streams = await Stream.find({id: {$in: ids}});
        return streams;
    } catch (error) {
        throw Error(`Error while retreiving Streams: ${error}`);
    }
}