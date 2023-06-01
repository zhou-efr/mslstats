import { getToken } from '@/lib/twitch/getToken'

export const getCurrentStream = async (user_id) => {
    try {
        const token = await getToken();
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Client-Id", process.env["TWITCH_CLIENT_ID"]);

        let urlencoded = new URLSearchParams();
        urlencoded.append("user_id", user_id);
        // urlencoded.append("id", stream_id);
        // urlencoded.append("sort", "time");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // console.log(process.env["TWITCH_API_URL"] + "/helix/streams?" + urlencoded);

        const res = await fetch(process.env["TWITCH_API_URL"] + "/helix/streams?" + urlencoded, requestOptions);
        const data = await res.json();

        if (res.status !== 200) {
            throw new Error(`getCurrentStream - ${res.status} : ${JSON.stringify(data)}`);
        }

        return data.data[0];
    } catch (error) {
        throw new Error(`getCurrentStream : ${user_id} - ${JSON.stringify(error)}`);
    }
}