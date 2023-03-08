import 'react-calendar/dist/Calendar.css';
import { getLatestStream } from "@twitch/getLatestStream";
import { getCurrentStream } from '@twitch/getCurrentStream';
import { getUser } from "@mongo/user/getUser";
import HomePage from '@/components/pages/home';

function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}

const getMonthList = (month, year) => {
    const today = new Date();
    const basedMonth = month;

    // get the first day of the first week of the month
    const firstDayOfMonth = new Date(year, basedMonth, 1);
    const firstWeekOfMonth = firstDayOfMonth.getWeek();
    const firstDay = getDateOfWeek(firstWeekOfMonth, year);

    // console.log(firstDay.toLocaleDateString("fr-FR"));
    // console.log(firstDayOfMonth.toLocaleDateString("fr-FR"));
    // console.log(firstWeekOfMonth);

    // get the last day of the last week of the month
    const lastDayOfMonth = new Date(year, basedMonth + 1, 0);
    const lastWeekOfMonth = lastDayOfMonth.getWeek();
    const firstDayOfLastWeekOfMonth = getDateOfWeek(lastWeekOfMonth, year);
    const lastDay = new Date(firstDayOfLastWeekOfMonth.getTime() + 6 * 24 * 60 * 60 * 1000);

    // console.log(lastDay.toLocaleDateString("fr-FR"));
    // console.log(lastDayOfMonth.toLocaleDateString("fr-FR"));
    // console.log(lastWeekOfMonth);

    const basedMonthList = [];
    let i = firstDay;

    while (i <= lastDay) {
        basedMonthList.push({
            date: i.toLocaleDateString("fr-FR"),
            isCurrentMonth: i.getMonth() === basedMonth,
            isToday: i.toLocaleDateString("fr-FR") === today.toLocaleDateString("fr-FR"),
            isSelected: i.toLocaleDateString("fr-FR") === today.toLocaleDateString("fr-FR"),
        });
        i = new Date(i.getTime() + 24 * 60 * 60 * 1000);
    }

    return basedMonthList;
}

Date.prototype.getWeek = function () {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

const getSessionUser = async () => {
    const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/me`, {
        headers: {
            cookie: `appSession=${cookies().get('appSession')?.value}`
            // cookie: cookies().getAll().map(c => `${c.name}=${c.value}`).join(';') -- all cookies
        }
    })
    return await res.json()
}

export default async function HomeServerPage(ctx) {
    const session = await getSessionUser();
    let streamer_id = ["798312463"]
    let streamer_name = ["mathieusommetlive"]
    console.log(session);
    if (session?.user) {
        const dbuser = await getUser(session.user.email);
        if (dbuser.followed_streams.length) {
            streamer_id = dbuser.followed_streams.map((stream) => stream.streamer_id);
            streamer_name = dbuser.followed_streams.map((stream) => stream.streamer_name);
        }
    }
    let streams = [];
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
        if (!streams_by_day[day]) {
            streams_by_day[day] = [];
        }
        streams_by_day[day].push(stream);
        streamer_names.push(stream.user_login);
    }

    return (
        <HomePage streams={streams_by_day} basedMonthList={basedMonthList} streamer_names={streamer_names} />
    )
}