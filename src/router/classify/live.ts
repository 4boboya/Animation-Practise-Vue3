import Live from '@/views/Live.vue'

export const live = {
    path: '/live',
    component: Live,
    children: [
        {
            path: 'channelSetting',
            name: 'channelSetting',
            component: () => import('@/views/channel/Channel.vue'),
            meta: {
                title: 'channelSetting'
            }
        },
    ]
};
