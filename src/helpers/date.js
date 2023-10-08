
import moment from 'moment'

export async function datesBeforeToday(monthsBack) {

    const startDate = new Date();

    var endDate = new Date().setMonth(new Date().getMonth() - monthsBack)

    const formatedStartDate = moment(startDate).format(`DD-MMM-YYYY`);
    const formatedEndDate = moment(endDate).format(`DD-MMM-YYYY`);

    return { formatedStartDate, formatedEndDate }
}

export function numberOfCurrentlyRunningLoans(loanApplications) {
    const now = moment();
    const activeLoans = loanApplications.filter((loanApplication => moment(loanApplication.maturityDate) > now))
    console.log(`### Active loans: `, activeLoans)
    return activeLoans.length;

}

export function covertFromMilliseconds(timeInMilliseconds) {
    return timeInMilliseconds;

}

export const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

/**
 * @param duration Duration in milliseconds
 * @description Convert time from milliseconds to hours and minutes
*/
export const convertMsToHM = (duration) => {
    let seconds = Math.floor(duration / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)} hrs ${padTo2Digits(minutes)} mins ${padTo2Digits(seconds)} secs`;
}