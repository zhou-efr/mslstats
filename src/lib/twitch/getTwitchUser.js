import { getToken } from '@/lib/twitch/getToken'

export const getTwitchUser = async (username) => {
    try {
        const token = await getToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Client-Id", process.env["TWITCH_CLIENT_ID"]);

        let urlencoded = new URLSearchParams();
        urlencoded.append("login", username);
        // urlencoded.append("first", "1");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(process.env["TWITCH_API_URL"] + "/helix/users?" + urlencoded);

        const res = await fetch(process.env["TWITCH_API_URL"] + "/helix/users?" + urlencoded, requestOptions);
        const data = await res.json();

        if (res.status != 200) {
            throw new Error(`getUser - ${res.status} : ${JSON.stringify(data)}`);
        }

        return data.data[0];
    } catch (error) {
        throw new Error(`getUser : ${username} - ${JSON.stringify(error)}`);
    }
}