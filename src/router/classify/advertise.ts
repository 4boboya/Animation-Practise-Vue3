import Advertise from '@/views/Advertise.vue'

export const advertise = {
    path: '/advertise',
    component: Advertise,
    children: [
        {
            path: 'advertiseSetting',
            name: 'advertiseSetting',
            component: () => import('@/views/advertise/Advertise.vue'),
            meta: {
                title: 'advertiseSetting'
            }
        },
    ]
};
