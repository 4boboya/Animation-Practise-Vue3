import Trade from '@/views/Trade.vue'

export const trade = {
    path: '/trade',
    component: Trade,
    children: [
        {
            path: 'tradeLog',
            name: 'tradeLog',
            component: () => import('@/views/trade/TradeLog.vue'),
            meta: {
                title: 'tradeLog'
            }
        },
    ]
};
