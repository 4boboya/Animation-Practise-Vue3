import Member from '@/views/Member.vue'

export const member = {
    path: '/member',
    component: Member,
    children: [
        {
            path: 'member',
            name: 'member',
            component: () => import('@/views/member/Member.vue'),
            meta: {
                title: 'member'
            }
        },
        {
            path: 'expert',
            name: 'expert',
            component: () => import('@/views/member/Expert.vue'),
            meta: {
                title: 'expert'
            }
        },
        {
            path: 'manager',
            name: 'manager',
            component: () => import('@/views/member/Manager.vue'),
            meta: {
                title: 'manager'
            }
        },
    ]
};
