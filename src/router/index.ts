import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '@/store/index';

import Main from '@/modules/main/main.vue';
import Login from '@/modules/login/login.vue';
import Register from '@/modules/register/register.vue';

import Dashboard from '@/pages/dashboard/dashboard.vue';
import Profile from '@/pages/profile/profile.vue';
import ForgotPassword from '@/modules/forgot-password/forgot-password.vue';
import RecoverPassword from '@/modules/recover-password/recover-password.vue';
import PrivacyPolicy from '@/modules/privacy-policy/privacy-policy.vue';

import User from '@/pages/user/User.vue';
import Group from '@/pages/group/group.vue'

import {
    getAuthStatus,
    getFacebookLoginStatus,
    GoogleProvider
} from '@/utils/oidc-providers';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/admin',
        name: 'Main',
        component: Main,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: 'user',
                name: 'user',
                component: User,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'group',
                name: 'group',
                component: Group,
                meta: {
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/admin/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/recover-password',
        name: 'RecoverPassword',
        component: RecoverPassword,
        meta: {
            requiresUnauth: true
        }
    },
    {
        path: '/privacy-policy',
        name: 'RecoverPassword',
        component: PrivacyPolicy
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach(async (to, from, next) => {
    console.log(to, from);
    let storedAuthentication = store.getters['auth/authentication'];

    if (!storedAuthentication) {
        storedAuthentication = await checkSession();
    }

    if (Boolean(to.meta.requiresAuth) && Boolean(!storedAuthentication)) {
        return next('/admin/login');
    }
    return next();
});

export default router;

export async function checkSession() {
    try {
        let responses: any = await Promise.all([
            getFacebookLoginStatus(),
            GoogleProvider.getUser(),
            getAuthStatus()
        ]);

        responses = responses.filter((r: any) => Boolean(r));

        if (responses && responses.length > 0) {
            return responses[0];
        }
    } catch (error: any) {
        return;
    }
}
