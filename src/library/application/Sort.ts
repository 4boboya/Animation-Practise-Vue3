export const ObjectOfArraySort = (data: any, key: string, sortLog: string) => {
    data.sort(function (a: any, b: any) {
        if (a[key] > b[key]) {
            return sortLog == key ? 1 : -1;
        } else if (a[key] < b[key]) {
            return sortLog == key ? -1 : 1;
        }
        return 0;
    });
    if (sortLog != key) {
        sortLog = key;
    } else {
        sortLog = "";
    }
    return { data, sortLog }
}