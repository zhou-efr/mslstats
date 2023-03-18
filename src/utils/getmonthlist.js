import {getDateOfWeek} from "@/utils/getdateofweek";
import {getWeek} from "@/utils/getweek";

export const getMonthList = (month, year) => {
    const today = new Date();
    const basedMonth = month;

    // get the first day of the first week of the month
    const firstDayOfMonth = new Date(year, basedMonth, 1);
    const firstWeekOfMonth = getWeek(firstDayOfMonth);
    const firstDay = getDateOfWeek(firstWeekOfMonth, year);

    // get the last day of the last week of the month
    const lastDayOfMonth = new Date(year, basedMonth + 1, 0);
    const lastWeekOfMonth = getWeek(lastDayOfMonth);
    const firstDayOfLastWeekOfMonth = getDateOfWeek(lastWeekOfMonth, year);
    const lastDay = new Date(firstDayOfLastWeekOfMonth.getTime() + 6 * 24 * 60 * 60 * 1000);

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
