<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-service',
                        index: 'Administrator',
                        title: '管理员管理',
                        subs: [
                            {
                                index: 'administrator-list',
                                title: '管理员列表'
                            },
                            {
                                index: 'add-administrator',
                                title: '添加管理员'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-location-outline',
                        index: 'Store',
                        title: '场地管理',
                        subs: [
                            {
                                index: 'Store',
                                title: '场地列表'
                            },
                            {
                                index: 'add-store',
                                title: '添加场地'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-service',
                        index: 'User-list',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'User-list',
                                title: '用户列表'
                            }
                            // ,
                            // {
                            //     index: 'add-user',
                            //     title: '添加用户'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-service',
                        index: 'act-list',
                        title: '活动管理',
                        subs: [
                            {
                                index: 'act-list',
                                title: '活动列表'
                            }
                            // ,
                            // {
                            //     index: 'add-act',
                            //     title: '添加活动'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-service',
                        index: 'topic-list',
                        title: '话题管理',
                        subs: [
                            {
                                index: 'topic-list',
                                title: '话题列表'
                            },
                            {
                                index: 'add-topic',
                                title: '添加话题'
                            }
                        ]
                    },
                    // {
                    //     icon: 'el-icon-tickets',
                    //     index: 'table',
                    //     title: '基础表格'
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'tabs',
                    //     title: 'tab选项卡'
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单相关',
                    //     subs: [
                    //         {
                    //             index: 'form',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'editor',
                    //             title: '富文本编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown编辑器'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // }
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'charts',
                    //     title: 'schart图表',
                    //      subs: [
                    //         {
                    //             index: 'form',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'editor',
                    //             title: '富文本编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown编辑器'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-rank',
                    //     index: 'drag',
                    //     title: '拖拽列表'
                    // },
                    // {
                    //     icon: 'el-icon-warning',
                    //     index: 'permission',
                    //     title: '权限测试'
                    // },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
