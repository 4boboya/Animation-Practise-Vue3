import { hintData, hintInput } from "@/model/vuex"

export default {
    namespaced: true,
    state: {
        SidebarStatus: true,
        Width: 0,
        DarkMode: false,
        Loading: false,
        HintStatus: false,
        HintData: {
            color: '',
            message: '',
            label: '',
            bgcolor: '',
        },
    },
    mutations: {
        UpdateSidebarStatus(state: { SidebarStatus: boolean; }, status = !state.SidebarStatus) {
            state.SidebarStatus = status;
        },
        UpdateWidth(state: { Width: Number; }, width: Number) {
            state.Width = width;
        },
        UpdateDarkMode(state: { DarkMode: boolean; }, darkMode: boolean) {
            state.DarkMode = darkMode;
        },
        UpdateLoading(state: { Loading: boolean; }, loading: boolean) {
            state.Loading = loading;
        },
        SetHint(state: { HintStatus: boolean, HintData: hintData }, hint: hintInput) {
            state.HintStatus = hint.status
            state.HintData.color = hint.color
            state.HintData.bgcolor = hint.bgcolor
            state.HintData.label = hint.label
            state.HintData.message = hint.message
        },
    },
    actions: {
    },
    getters: {
    }
}