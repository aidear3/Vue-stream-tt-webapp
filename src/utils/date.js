export function changeTimeFormatEST(inputDate) {
    let input = inputDate;
    let resultStr = "";

    const date = new Date(input + " GMT");

    // Get the year, month, day, hours, minutes, and seconds as strings
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Concatenate the date and time strings with hyphens and colons in between
    const localTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    input = localTime;

    if (inputDate.split("-").length != 2) {
        // let date = new Date(input);
        // let options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        // let output = date.toLocaleString("en-US", options);
        // output = output.replace("AM", "am").replace("PM", "pm").replace("00", "12");
        // console.log(output);

        // let date = new Date(input);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let fullMonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // let output = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " " + (date.getHours() % 12 || 12) + ":" + date.getMinutes() + (date.getHours() >= 12 ? " PM" : " AM");

        input = input.replace(" ", "T") + "Z";
        const givenDate = new Date(input);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
        let formattedDate = givenDate.toLocaleString('en-US', options);
        // var formatArray = formattedDate.split(' ');
        // for (var i = 0; i < fullMonthName.length; i++) {
        //     if (formatArray[0] == fullMonthName[i]) {
        //         formatArray[0] = months[i];
        //     }
        // }

        // for (var i = 0; i < formatArray.length; i++) {
        //     if (i == formatArray.length - 1) {
        //         resultStr += formatArray[i];
        //     } else {
        //         resultStr += formatArray[i] + " ";
        //     }
        // }
        let yearStr = changeTimeFormatGMT(input);
        let timestr = formattedDate.split('at');
        resultStr = yearStr + ' - ' + timestr[1];
    } else {
        resultStr = inputDate;
    }

    return resultStr;
}

export function changeTimeFormatGMT(inputDate) {
    const date = new Date(inputDate);
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });

    return `${day}${getOrdinalIndicator(day)} ${month} ${year}`;
}

export function getOrdinalIndicator(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}
