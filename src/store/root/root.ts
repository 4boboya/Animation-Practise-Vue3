export default {
    namespaced: true,
    state: {
        BackendService:(document.querySelectorAll("meta[name='backend-service']")[0] as HTMLMetaElement).content,
        ImgUrl:(document.querySelectorAll("meta[name='img-url']")[0] as HTMLMetaElement).content,
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    }
}