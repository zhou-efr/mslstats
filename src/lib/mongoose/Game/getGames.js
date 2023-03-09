import Game from './GameModel';
import dbConnect from '../dbConnect';

export const getGames = async () => {
    try {
        await dbConnect();

        return await Game.find({});
    } catch (error) {
        throw Error(`Error while retreiving Streams: ${error}`);
    }
}