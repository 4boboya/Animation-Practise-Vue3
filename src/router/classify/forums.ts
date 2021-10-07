import Forum from '@/views/Forum.vue'

export const forum = {
    path: '/forum',
    component: Forum,
    children: [
        {
            path: 'forum',
            name: 'forum',
            component: () => import('@/views/forum/Forum.vue'),
            meta: {
                title: 'forum'
            }
        },
        {
            path: 'topic',
            name: 'topic',
            component: () => import('@/views/forum/Topic.vue'),
            meta: {
                title: 'topic'
            }
        },
    ]
};