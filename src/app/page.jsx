import {getLatestStream} from "@twitch/getLatestStream";
import {getCurrentStream} from "@twitch/getCurrentStream";
import {getUser as getSessionUser} from "@/lib/auth0/getuser";
import {getUser as getDbUser} from "@/lib/mongoose/user/getUser";
import {getMonthList} from "@/utils/getmonthlist";
import {Home} from "@/components/home/home";

export default async function HomePage() {
    console.log("rendering home page")
    const user = await getSessionUser();

    let streamer_id = ["798312463"]
    let streamer_name = ["mathieusommetlive"]
    let streams = [];

    if (user) {
        const db_user = await getDbUser(user.email);
        if (db_user.followed_streams.length) {
            streamer_id = db_user.followed_streams.map((stream) => stream.streamer_id);
            streamer_name = db_user.followed_streams.map((stream) => stream.streamer_name);
        }
    }

    console.log({
        context: "home page",
        streamer_id,
        streamer_name,
        user
    })

    for (let i = 0; i < streamer_id.length; i++) {
        const temp = await getLatestStream(streamer_id[i], 31, "month");
        const current_stream = await getCurrentStream(streamer_id[i])

        if (current_stream) {
            temp[0].live = true;
            temp[0].thumbnail_url = current_stream.thumbnail_url;
            temp[0].url = "https://www.twitch.tv/".concat(streamer_name[i]);
        }

        streams = streams.concat(temp);
    }

    const today = new Date();
    const basedMonth = today.getMonth();
    const basedMonthList = getMonthList(basedMonth, today.getFullYear());
    const streams_by_day = {}
    const streamer_names = []

    for (const stream of streams) {
        const date = new Date(stream.published_at);
        const day = date.toLocaleDateString("fr-FR");

        if (!streams_by_day[day]) streams_by_day[day] = [];
        streams_by_day[day].push(stream);

        if (!streamer_names.includes(stream.user_login)) streamer_names.push(stream.user_login);
    }

    return (
        <Home
            streams={streams_by_day}
            streamer_names={streamer_names}
            basedMonthList={basedMonthList}
            basedMonth={basedMonth}
        />
    );
}

