import { Hint } from "@/model/hint"

export const CheckData = (data: any) => {
    if (data == null || data == "" || data == undefined || (typeof data == "number" && isNaN(data))) {
        return false
    }
    return true
}

export const CheckPassword = (password: string, checkPassword: string, admin: boolean = false) => {
    const hintData = {} as Hint
    const minLengthCheck = admin ? 4 : 8
    hintData.color = 'text-white'
    if (password != checkPassword) {
        hintData.message = "密碼與確認密碼不同";
        hintData.label = "失敗";
        hintData.bgcolor = "bg-red-500";
        return { status: false, hint: hintData }
    } else if (password.length < minLengthCheck || password.length > 12) {
        hintData.message = `密碼長度在 ${minLengthCheck} 至 12 個字`;
        hintData.label = "失敗";
        hintData.bgcolor = "bg-red-500";
        return { status: false, hint: hintData }
    }
    return { status: true, hint: hintData }
}