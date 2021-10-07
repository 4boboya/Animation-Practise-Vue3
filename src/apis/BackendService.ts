import { $backendservice, $backendFormservice } from './https'

// --- forums ---
export const GetStoredData = async (requestData: any) => {
    const storedData = await $backendservice('GET', 'api/payment/depositlogs', { query: requestData });
    return storedData;
}
export const GetPayData = async (requestData: any) => {
    const payData = await $backendservice('GET', 'api/payment/consumptionlogs', { query: requestData });
    return payData;
}

export const GetAuditTopic = async (requestData: any) => {
    const auditTopic = await $backendservice('GET', 'api/forum/pendingexpertposts', { query: requestData });
    return auditTopic;
}

export const GetForumList = async (requestData: any) => {
    const forumList = await $backendservice('GET', 'api/forum/forumlist', { query: requestData });
    return forumList;
}

export const UpdateAuditTopic = async (auditTopicData: any) => {
    const response = await $backendservice('POST', 'api/forum/updatependingexpertpost', { body: auditTopicData });
    return response;
}

// --- memer ---
export const GetMembersData = async (requestData: any) => {
    const memerData = await $backendservice('GET', 'api/member/members', { query: requestData });
    return memerData
}

export const GetAdminData = async (requestData: any) => {
    const memerData = await $backendservice('GET', 'api/member/expertmembers', { query: requestData });
    return memerData
}

export const UpdateMemberExpertData = async (memberData: any) => {
    const response = await $backendservice('POST', 'api/member/updatememberdata', { body: memberData });
    return response
}

export const UpdateAdminData = async (adminData: any) => {
    const response = await $backendservice('POST', 'api/member/expertmembers', { body: adminData });
    return response
}
export const UpdateMemberExpertPassword = async (memberPassword: any) => {
    const response = await $backendservice('POST', 'api/member/remakememberpassword', { body: memberPassword });
    return response
}

export const UpdateAdminPassword = async (adminPassword: any) => {
    const response = await $backendservice('POST', 'api/member/expertmembers', { body: adminPassword });
    return response
}
export const UpdateMemberExpertRank = async (memberRank: any) => {
    const response = await $backendservice('POST', 'api/member/updatememberrank', { body: memberRank });
    return response
}

export const UpdateAdminRank = async (adminRank: any) => {
    const response = await $backendservice('POST', 'api/member/expertmembers', { body: adminRank });
    return response
}

// --- adv ---
export const GetTopAdv = async (requestData: any) => {
    const advData = await $backendservice('GET', 'api/advertising/top', { query: requestData });
    return advData
}

export const GetLeftAdv = async (requestData: any) => {
    const advData = await $backendservice('GET', 'api/advertising/left', { query: requestData });
    return advData
}

export const GetRightAdv = async (requestData: any) => {
    const advData = await $backendservice('GET', 'api/advertising/right', { query: requestData });
    return advData
}

export const GetFloatAdv = async (requestData: any) => {
    const advData = await $backendservice('GET', 'api/advertising/float', { query: requestData });
    return advData
}

export const CreateAdv = async (advData: any) => {
    const response = await $backendservice('POST', 'api/advertising/createadvertising', { body: advData });
    return response
}

export const EditAdv = async (advData: any) => {
    const response = await $backendservice('POST', 'api/advertising/editadvertising', { body: advData });
    return response
}

// --- channel ---
export const GetChannel = async (requestData: any) => {
    const channelData = await $backendservice('GET', 'api/gamelive/channels', { query: requestData });
    return channelData
}

export const CreateChannel = async (channelData: any) => {
    const response = await $backendservice('POST', 'api/gamelive/channel', { body: channelData });
    return response
}

export const UpdateChannel = async (channelData: any) => {
    const response = await $backendservice('PUT', 'api/gamelive/channels', { body: channelData });
    return response
}

export const CloseChannel = async (channelData: any) => {
    const response = await $backendservice('PUT', 'api/gamelive/channel/close', { body: channelData });
    return response
}

export const OpenChannel = async (channelData: any) => {
    const response = await $backendservice('PUT', 'api/gamelive/channel/open', { body: channelData });
    return response
}