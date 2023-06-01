import dbConnect from "@mongo/dbConnect";
import Stream from "@mongo/Stream/StreamModel";

export async function convertOldStreamGameToNew() {
    try {
        await dbConnect();
        const oldStreamGame = await Stream.find({});

        for (let i = 0; i < oldStreamGame.length; i++) {
            const stream = await Stream.findById(oldStreamGame[i]._id);

            if (stream.games) {
                // console.log(`skipping ${stream.title} (${stream.id})`);
                continue;
            }

            let games = [];
            games.push({
                title: stream.game_played,
                start: stream.game_start,
                end: stream.game_end,
                planned: stream.game_planned === stream.game_played,
            });
            if (stream.game_secondary) {
                // console.log("have game_secondary")
                // console.log(stream)
                // console.log("-------------------")
                games.push({
                    title: stream.game_secondary,
                    planned: stream.game_planned === stream.game_secondary,
                });
            }

            // console.log("games")
            // console.log(games)

            stream.games = games;

            // delete stream.game_start;
            // delete stream.game_end;
            // delete stream.game_planned;
            // delete stream.game_played;
            // delete stream.game_secondary;

            await stream.save();
            // console.log(`converted ${stream.title} (${stream.id})`);
            //sleep 500ms to not get rate limited
            await new Promise(resolve => setTimeout(resolve, 500));
        }

    } catch (e) {
        throw new Error(`Error in convertOldStreamGameToNew: ${e}`);
    }
}