export default new class DateTime {
    date = new Date()
    /*
        diff       計算日期(當日日期-傳入天數)                          return Date Object
        diff_f     計算日期(當日日期-傳入天數)                          return DateTime String
        diff_week  計算星期(該星期-傳入周數)                            return Javascript Object
        diff_date  日期加減(傳入天數-傳入天數)                          return DateTime String
        diff_month 月份加減(該月份-傳入月份)                            return Javascript Object
        range      取日期區間中所有日期(該月份-傳入月份)                 return Javascript Array
        de_format  DateTime String轉Date Object(傳入DateTime String)   return Date Object
        format     Date Object轉DateTime String(傳入Date Object)       return DateTime String
        format     Date Object轉DateTime String(傳入Date Object)       return DateTime String
        month      取得當天的月份(void)                                 return Javascript String
        between    判斷傳入日期是否再自定義的區間當中(欲判斷日期, 起, 訖)  return boolean
    */
    DateToString = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`;
    }
    
    TimeToString = (date: Date) => {
        return `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
    }

    DateTimeToUnix = (date: Date) => {
        const dateTime = new Date(date).getTime()
        return Math.floor(dateTime/1000)
    }

    UnixToDateTime = (unix: number) => {
        const date = new Date(unix*1000);
        return date
    }

    UnixToDateTimeString = (unix: number) => {
        const date = new Date(unix*1000);
        return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`} ${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}:${date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`}`;
    }

    Simplify = (dateTimeString: string) => {
        dateTimeString = dateTimeString.replace(`${new Date().getFullYear()}-`, "");
        dateTimeString = dateTimeString.replace("-", "/");
        return dateTimeString;
    }

    proccessTimeToSimple = (dateTimeString: string) => {
        if (dateTimeString.length > 20) {
            dateTimeString = this.Simplify(dateTimeString)
            dateTimeString = dateTimeString.replace("&nbsp;", "");
            dateTimeString = dateTimeString.replace(" ", "<br/>");
        }
        return dateTimeString;
    }
    diff_f = (offset: number) => {
        let dd = new Date();
        dd = new Date(this.date.getTime() - (offset * 24 * 3600 * 1000));
        return `${dd.getFullYear()}-${dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : `0${dd.getMonth() + 1}`}-${dd.getDate() >= 10 ? dd.getDate() : `0${dd.getDate()}`}`;
    }
    diff = (offset: number) => {
        let dd = new Date();
        dd = new Date(this.date.getTime() - (offset * 24 * 3600 * 1000));
        return dd;
    }
    diff_week = (offset: number) => {
        const today = this.date.getDay();
        const start_week = (today * 24 * 3600 * 1000);
        const end_week = ((6 - today) * 24 * 3600 * 1000);
        const start = new Date((this.date.getTime() - start_week)).getTime() - (7 * offset * 24 * 3600 * 1000);
        const end = new Date(this.date.getTime() + end_week).getTime() - (7 * offset * 24 * 3600 * 1000);
        return {
            start: this.format(start),
            end: this.format(end),
            today: this.format(this.date.getTime())
        };
    }
    diff_date = (date: string, offset: number) => {
        let dd = new Date(date);
        dd = new Date(dd.getTime() - (offset * 24 * 3600 * 1000));
        return `${dd.getFullYear()}-${dd.getMonth() + 1 > 9 ? dd.getMonth() + 1 : `0${dd.getMonth() + 1}`}-${dd.getDate() >= 10 ? dd.getDate() : `0${dd.getDate()}`}`;
    }
    diff_month = (offset = 0) => {
        let year = Number(this.date.getFullYear());
        let next_year;
        let next_month = (Number(this.month()) + 1) - offset;
        let this_month = (Number(this.month())) - offset;
        if (this_month <= 0 || next_month <= 0) {
            do {
                next_month += 12;
                this_month += 12;
                year--;
            } while (this_month <= 0);
        }
        next_year = year;
        if (next_month > 12 || this_month > 12) {
            next_month -= next_month > 12 ? 12 : 0;
            this_month -= this_month > 12 ? 12 : 0;
            next_year++;
        }
        const end_month = next_month < 10 ? `0${next_month}` : next_month.toString();
        const start_month = this_month < 10 ? `0${this_month}` : this_month.toString();
        const end = this.diff_date(`${next_year}-${end_month}-01`, 1);
        const start = `${year}-${start_month}-01`;
        return { start, end };
    }
    diff_type_date(start: Date, offset: number) {
        const resDate = new Date(start.getTime() - (offset * 24 * 3600 * 1000));
        return resDate
    }
    range = (start: string, end: string) => {
        const date_all = [];
        let i = 0;
        const startTime = this.de_format(start);
        const endTime = this.de_format(end);
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
            const year = startTime.getFullYear();
            const month = (startTime.getMonth() + 1).toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1).toString();
            const day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
            date_all[i] = year + "-" + month + "-" + day;
            startTime.setDate(startTime.getDate() + 1);
            i += 1;
        }
        return date_all;
    }
    de_format = (datestr: string) => {
        const temp = datestr.split("-");
        const new_date = new Date(Number(temp[0]), Number(temp[1]) - 1, Number(temp[2]));
        return new_date;
    }
    format = (object: number) => {
        const obj = new Date(object);
        return `${obj.getFullYear()}-${obj.getMonth() + 1 > 9 ? obj.getMonth() + 1 : `0${obj.getMonth() + 1}`}-${obj.getDate() > 9 ? obj.getDate() : `0${obj.getDate()}`}`;
    }
    month = () => {
        return this.date.getMonth() + 1 <= 9 ? `0${this.date.getMonth() + 1}` : this.date.getMonth() + 1 > 12 ? '01' : this.date.getDate();
    }
    between = (target: string, start: string, end: string) => {
        const res_target = new Date(this.format(new Date(target).getTime())).getTime();
        const res_start = new Date(this.format(new Date(start).getTime())).getTime();
        const res_end = new Date(this.format(new Date(end).getTime())).getTime();
        if (Number(res_target) >= Number(res_start) && Number(res_target) <= Number(res_end)) return true;
        else return false;
    }
    unixTime = () => {
        return Math.floor(Date.now())
    }
    checkDate = (unixTime: number) => {
        const currentUnixTime = this.unixTime()
        const inputUnixTime = unixTime * 1000
        if (inputUnixTime == 0) {
            return 0
        } else {
            if (inputUnixTime >= currentUnixTime) {
                return this.format(inputUnixTime)
            } else {
                return 0
            }
        }
    }
}
