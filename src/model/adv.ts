export interface GetAdvReq {
    title: string
    enabled: number | string
    startTime: string
    closeTime: string
    createby: string | null
}

export interface UpdateAdvData {
    id: string,
    url: string,
    title: string,
    createdBy: any,
    action: any,
    seq: any,
    enabled: any,
    startTime: Date | null,
    closeTime: Date | null,
    path: any,
}