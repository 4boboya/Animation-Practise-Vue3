
import { reactive } from "vue";

export const PageData = (data: any, pageRows: number) => {
    const retuenPageData = reactive<any>([]);
    let count = 0;
    let pageData = reactive<any>([]);
    data.forEach((item: any, index: number) => {
        pageData.push(item);
        count++;
        if (count % pageRows == 0) {
            retuenPageData.push(pageData);
            pageData = reactive<any>([]);
        }
        if (index + 1 == data.length && count % pageRows != 0) {
            retuenPageData.push(pageData);
        }
    });
    return retuenPageData;
};