export interface TopicAuditReq {
    Discount: number | string
    Price: number | string
    Reason: string
    Result: number
    TargetForumID: number
    TopicID: number
    User_Email: string
}

export interface TopicAuditData {
    body: string
    created: string
    discount: number
    modified: string
    price: number
    reason: string
    result: number
    targetForumID: number
    title: string
    topicID: number
    user_Email: string
}