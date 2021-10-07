export const SidebarData = [
    { name: "Home", child: [], path: "/" },
    { name: "討論區", child: [{ "貼文管理": "/forum/topic" }, { "討論區管理": "/forum/forum" }], path: "" },
    { name: "交易紀錄", child: [], path: "/trade/tradeLog" },
    { name: "會員管理", child: [{ "一般會員管理": "/member/member" }, { "專家管理": "/member/expert" }, { "管理者管理": "/member/manager" }], path: "" },
    { name: "廣告管理", child: [], path: "/advertise/advertiseSetting" },
    { name: "信箱維護", child: [], path: "/email" },
    { name: "直播頻道維護", child: [], path: "/live/channelSetting" },
]