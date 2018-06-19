<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img :src="cropImg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                    
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>{{lastLoginTime}}</span>
                                 <span class="crop-demo-btn">更换头像
                                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                                </span>
                            </div>
                            
                        </el-card>
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>技术栈</span>
                            </div>
                            
                            <el-row :gutter="20">
                                <el-col :span="6"><div><img src="../../assets/vue_logo.png" alt="" width="50" height="50"></div><div class="center-text">vue</div></el-col>
                                <el-col :span="6"><div><img src="../../assets/axios_logo.png" alt="" width="50" height="50"></div><div class="center-text">axios</div></el-col>
                                <el-col :span="6"><div><img src="../../assets/element-ui_logo.png" alt="" width="50" height="50"></div><div class="center-text">Element UI</div></el-col>
                                <el-col :span="6"><div><img src="../../assets/css_logo.png" alt="" width="50" height="50"></div><div class="center-text">css3</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6"><div><img src="../../assets/html_logo.png" alt="" width="50" height="50"></div><div class="center-text">html5</div></el-col>
                                <el-col :span="6"><div><img src="../../assets/js_logo.png" alt="" width="50" height="50"></div><div class="center-text">JS</div></el-col>
                                
                            </el-row>
                            
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-mobile-phone grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{registers}}</div>
                                    <div>用户注册量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{stores}}</div>
                                    <div>入驻商家</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-document grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{acts}}</div>
                                    <div>发起活动数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" :body-style="{ height: '304px'}">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

            </el-col>
        </el-row>
        <!-- <vue-cropper ref="cropper" :src="imgSrc" style="height:300px;width:300px;"></vue-cropper>
        <div class="crop-demo">
                <img :src="cropImg" class="pre-img">
                
            </div> -->
             <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button>取 消</el-button>
                    <el-button type="primary" @click="uploadAvatar">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import VueCropper from 'vue-cropperjs';
    export default {
        data() {
            return {
                myhost:'http://39.107.66.152:8080',
                imgSrc:'./static/img/img.jpg',
                cropImg:'',
                useradminID:null,
                name: localStorage.getItem('ms_username'),
                lastLoginTime: localStorage.getItem(localStorage.getItem('ms_username')+'LastTime'),
                registers:123,
                stores:321,
                acts:123,
                dialogVisible:false,
                todoList: [
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ]
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通管理员';
            }
        },
        created(){
             var that = this;
            axios.post(this.myhost+'/index/admin',qs.stringify({username:that.name}))
            .then(function(res){
                that.registers = res.data[0];
                that.stores = res.data[1];
                that.acts = res.data[2];
                if(res.data[3]){
                    that.cropImg = res.data[3];
                }
                that.useradminID = res.data[4];
            });
            
        },
        methods:{
            setImage(e){
                this.imgFile = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(this.imgFile);
            },
             cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            uploadAvatar(){
                this.dialogVisible = false;
                var imgBlob = this.convertBase64UrlToBlob(this.cropImg);
                console.log(this.cropImg)
                var formdata = new FormData();
                formdata.append('userID',this.useradminID);
                formdata.append('modal_file',imgBlob,'a.jpg');
                axios.post('http://localhost:8080/admin/adminUserAvatar',formdata)
                .then(function(res){
                    console.log(res.data)
                });
            },
            convertBase64UrlToBlob(urlData){
        　　　　var bytes=window.atob(urlData.split(',')[1]);    
        　　　　var ab = new ArrayBuffer(bytes.length);     
        　　　　var ia = new Uint8Array(ab);     
        　　　　for (var i = 0; i < bytes.length; i++) {          ia[i] = bytes.charCodeAt(i);      }       
        　　　　return new Blob( [ab] , {type : 'image/png'});  
        　　} 
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }
    /*技术栈*/
    .center-text{
        width: 50px;
        text-align: center;
    }

    /**upload*/
        .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 50px;
        line-height: 50px;
        /* padding: 0 20px; */
        margin-left: 30px;
        /* background-color: #409eff; */
        color: #409eff;
        cursor: pointer;
        font-size: 15px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
