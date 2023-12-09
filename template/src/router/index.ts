import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/home/HomePage.vue')
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('@/components/not-found/NotFound.vue')
        },
        {
            path: '/home',
            component: () => import('@/views/home/HomePage.vue')
        },
        {
            path: '/index',
            component: () => import('@/views/home/HomePage.vue')
        },
        {
            path: '/about',
            component: () => import('@/views/about/AboutPage.vue')
        },
        {
            path: '/contact',
            component: () => import('@/views/contact/ContactPage.vue')
        },
        {
            path: '/products',
            component: () => import('@/views/product/ProductPage.vue')
        },
        {
            path: '/combos',
            component: () => import('@/views/combo/ComboPage.vue')
        },
        {
            path: '/cart',
            component: () => import('@/views/cart/CartPage.vue'),
        },
        {
            path: '/blogs',
            component: () => import('@/views/blog/BlogPage.vue'),
        },
        {
            path: '/bookings',
            component: () => import('@/views/booking/BookingPage.vue'),
        },
    ]
})

export default router
