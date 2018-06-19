import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path:'/index',
                    component: resolve => require(['../components/page/index.vue'],resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/Administrator',
                    component: resolve => require(['../components/page/Administrator.vue'], resolve),
                    meta: { title: '管理员管理' }
                },
                {
                    path: '/administrator-list',
                    component: resolve => require(['../components/page/Administrator.vue'], resolve),
                    meta: { title: '管理员列表' }
                },
                {
                    path: '/add-administrator',
                    component: resolve => require(['../components/page/AddAdministrator.vue'], resolve),
                    meta: { title: '添加管理员' }
                },
                {
                    path: '/Store',
                    component: resolve => require(['../components/page/Store.vue'], resolve),
                    meta: { title: '场地列表' }
                },
                {
                    path: '/add-store',
                    component: resolve => require(['../components/page/AddVanue.vue'], resolve),
                    meta: { title: '添加场地' }
                },
                {
                    path: '/User-list',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/add-user',
                    component: resolve => require(['../components/page/AddUser.vue'], resolve),
                    meta: { title: '添加用户' }
                },
                {
                    path: '/act-list',
                    component: resolve => require(['../components/page/Activity.vue'], resolve),
                    meta: { title: '活动列表' }
                },
                {
                    path: '/add-act',
                    component: resolve => require(['../components/page/AddVanue.vue'], resolve),
                    meta: { title: '添加活动' }
                },
                {
                    path: '/topic-list',
                    component: resolve => require(['../components/page/Topic.vue'], resolve),
                    meta: { title: '话题列表' }
                },
                {
                    path: '/add-topic',
                    component: resolve => require(['../components/page/AddTopic.vue'], resolve),
                    meta: { title: '添加话题' }
                },
                
                
                
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
