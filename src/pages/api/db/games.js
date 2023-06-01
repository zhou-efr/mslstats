import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
import {updateGames} from "@mongo/Game/updateGames";
import {isAdministrator} from "@/lib/auth0/administrators";


export default withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res);

    if (!isAdministrator(user.email)) {
        res.status(403).end();
        return;
    }

    let status = 201;
    let response = {};
    try {
        await updateGames();
    } catch (error) {
        // console.log(error);
        status = 500;
    }

    // console.log(`status: ${status}, response: ${JSON.stringify(response)}`);

    res.status(status).end();
})
