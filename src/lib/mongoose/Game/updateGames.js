import Game from './GameModel';
import Stream from '../Stream/StreamModel';
import dbConnect from '../dbConnect';

export const updateGames = async () => {
    try {
        await dbConnect();

        const streams = await Stream.find({});

        const games = await Game.find({});

        const gameTitles = games.map((game) => game.title);

        const newGames = []

        for (const stream of streams) {
            if (!gameTitles.includes(stream.game_played) && newGames.every((game) => game.title !== stream.game_played)) {
                newGames.push({
                    title: stream.game_played,
                    totalDuration: 0,
                    expectedDuration: 0,
                    finished: false,
                    numberOfSessions: 0,
                });
            }
        }

        await Game.insertMany(newGames);

        // update games totalDuration
        const updatedGames = await Game.find({});
        const updatedGamesTitles = updatedGames.map((game) => game.title);

        for (const game of updatedGames) {
            game.totalDuration = 0;
            game.numberOfSessions = 0;
            await game.save();
        }

        const streamsToUpdate = streams.filter((stream) => updatedGamesTitles.includes(stream.game_played));

        for (const stream of streamsToUpdate) {
            const game = updatedGames.find((game) => game.title === stream.game_played);
            game.totalDuration += stream.game_end - stream.game_start;
            game.numberOfSessions += 1;
            await game.save();
        }
    } catch (error) {
        throw Error(`Error while updating Games: ${error}`);
    }
}