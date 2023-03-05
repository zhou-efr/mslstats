import Stream from './StreamModel';
import dbConnect from '../dbConnect';

export const getGameList = async () => {
    try {
        await dbConnect();

        const streams = await Stream.find({});
        const games = [...new Set(streams.map((stream) => stream.game_played))];

        return games;
    } catch (error) {
        throw Error(`Error while retreiving game list: ${error}`);
    }
}