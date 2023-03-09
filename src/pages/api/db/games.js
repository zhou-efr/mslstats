import {withApiAuthRequired} from "@auth0/nextjs-auth0";
import {updateGames} from "@mongo/Game/updateGames";


export default withApiAuthRequired(async function handler(req, res) {

    let status = 201;
    let response = {};
    try {
        await updateGames();
    } catch (error) {
        console.log(error);
        status = 500;
    }

    console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).end();
})
