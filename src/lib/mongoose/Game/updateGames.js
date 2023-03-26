import Stream from '../Stream/StreamModel';
import dbConnect from '../dbConnect';
import {updateGame} from "@mongo/Game/updateGame";

export const updateGames = async () => {
    try {
        await dbConnect();

        const streams = await Stream.find({});

        for (const stream of streams) {
            await updateGame(stream);
        }
    } catch (error) {
        throw Error(`Error while updating Games: ${error}`);
    }
}