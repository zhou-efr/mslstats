export const getToken = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("client_id", process.env["TWITCH_CLIENT_ID"]);
    urlencoded.append("client_secret", process.env["TWITCH_CLIENT_SECRET"]);
    urlencoded.append("grant_type", "client_credentials");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const res = await fetch(process.env["TWITCH_TOKEN_URL"] + "/oauth2/token", requestOptions);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(`getToken - ${res.status} : ${data}`);
    }

    return data.access_token;
}