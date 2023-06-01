import {getToken} from '@/lib/twitch/getToken'

export const getStream = async (stream_id) => {
    try {
        const token = await getToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Client-Id", process.env["TWITCH_CLIENT_ID"]);

        let urlencoded = new URLSearchParams();
        urlencoded.append("id", stream_id);
        // urlencoded.append("user_id", user_id);
        // urlencoded.append("sort", "time");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(process.env["TWITCH_API_URL"] + "/helix/videos?" + urlencoded);

        const res = await fetch(process.env["TWITCH_API_URL"] + "/helix/videos?" + urlencoded, requestOptions);
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(`getLatestStream - ${res.status} : ${JSON.stringify(data)}`);
        }

        return data.data[0];
    } catch (error) {
        throw new Error(`getLatestStream : ${stream_id} - ${JSON.stringify(error)}`);
    }
}