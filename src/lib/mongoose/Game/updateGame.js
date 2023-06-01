import Game from "@mongo/Game/GameModel";

export async function updateGame(stream) {
    for (const game of stream.games) {
        // console.log({
            context: 'updateGame',
            game: game.title,
            stream: stream.title,

        })
        const gameInDb = await Game.findOne({title: game.title}).exec();
        // // console.log("CA PASSE OU PAS ?!")
        if (gameInDb) {
            // // console.log({
            //     context: 'updateGame - gameInDb',
            //     gameInDb: gameInDb,
            // })

            if (!gameInDb.sessions) gameInDb.sessions = [];
            if (gameInDb.sessions.includes(stream.id)) continue;
            gameInDb.sessions.push(stream.id);
            gameInDb.numberOfSessions = gameInDb.sessions.length;
            gameInDb.totalDuration += game.start - game.end;

            await gameInDb.save();
        } else {
            // // console.log("ET LA ? ?!")
            const newGame = await Game.create({
                title: game.title,
                expectedDuration: 0,
                totalDuration: game.start - game.end,
                finished: false,
                numberOfSessions: 1,
                sessions: [stream.id],
            });
            // // console.log({
            //     context: 'updateGame - gameInDb create',
            //     newGame: newGame,
            // })
        }
    }
}