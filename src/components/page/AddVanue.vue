<template>
    <div class="table">
        <div class="crumbs">
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>场地管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加场地</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="addAdministrator-form">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">

                    <el-form-item label="场地图片:" prop="vanueName">
                    <img :src="imgSrc" class="user-avator" alt="暂时无图" width="100px" height="100px">
                        
                       <span class="crop-demo-btn">更换图片
                                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                                </span>
                    </el-form-item>
                    <el-form-item label="场地名称:" prop="vanueName">
                        <el-input v-model="form.vanueName"></el-input>
                    </el-form-item>
                    <el-form-item label="位置:" prop="vanuePlace">
                        <el-input v-model="form.vanuePlace"></el-input>
                    </el-form-item>
                    <el-form-item label="星级:" prop="vanueAssess">
                        <el-input v-model="form.vanueAssess" placeholder="0-5的数，最多保留一位小数"></el-input>
                    </el-form-item>
                     <el-form-item label="约成单数:" prop="vanueOrder">
                        <el-input v-model="form.vanueOrder" placeholder="整数"></el-input>
                    </el-form-item>
                     <el-form-item label="价格:" prop="vanuePrice">
                        <el-input v-model="form.vanuePrice" placeholder="格式为30元/天或20元/小时"></el-input>
                    </el-form-item>
                     <el-form-item label="描述标签:" prop="vanueClass">
                        <el-input v-model="form.vanueClass" placeholder="格式为['描述一','描述二']"></el-input>
                    </el-form-item>
                     <el-form-item label="联系方式:" prop="telNumber">
                        <el-input v-model="form.telNumber" placeholder="请填写联系电话"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="resetForm('form')">重置</el-button>
                        <el-button type="primary" @click="addVanue('form')">立即添加</el-button>
                    </el-form-item>
                </el-form>

            </div>
             <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button>取 消</el-button>
                    <el-button type="primary" @click="uploadAvatar">确 定</el-button>
                </span>
            </el-dialog>
            
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import axios from 'axios';
import VueCropper from 'vue-cropperjs';

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                console.log(1)
                 if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else{
                    callback();
                }
            };
            return {
               cropImg:'',
               imgFile:'',
               dialogVisible:false,
               imgSrc:'./static/img/img.jpg',
               form:{
                    vanueName:'',
                    vanuePlace:'',
                    vanueAssess:'',
                    vanueOrder:'',
                    vanuePrice:'',
                    vanueClass:'',
                    telNumber:''
               },
               
               rules:{
                   vanueName:[
                       { required: true,message: '请输入场地名称',tigger:'blur'},
                       { min:3, max:20,message:'长度在3-20个字符',tigger:'blur'}
                   ],
                   vanuePlace:[
                       {required: true, message: '请输入地址',tigger: 'blur'}
                   ],
                   vanuePrice:[
                       {required: true, message: '请输入价格',tigger: 'blur'}
                   ],
                   vanueAssess:[
                       {required: true, message: '请输入星级',tigger: 'blur'}
                   ],
                   vanueOrder:[
                       {required: true, message: '请输入约成单数',tigger: 'blur'}
                   ],
                   telNumber:[
                       {required: true, message: '请输入联系电话',tigger: 'blur'}
                   ],
                   vanueClass:[
                       {required: true, message: '请输入描述',tigger: 'blur'}
                   ],
               }
            }
            
        },
        methods: {
           resetForm(form){
               this.$refs[form].resetFields();
           },
           addVanue(form){
               this.$refs[form].validate((valid)=>{
                   if(valid){
                       if(this.cropImg){
                           var that = this;
                           let imgBlob = this.convertBase64UrlToBlob(this.cropImg);
                           let formdata = new FormData();
                            formdata.append('modal_file',imgBlob,'a.jpg');
                            formdata.append('vanueName',this.form.vanueName);
                            formdata.append('vanuePlace',this.form.vanuePlace);
                            formdata.append('vanueAssess',this.form.vanueAssess);
                            formdata.append('vanueOrder',this.form.vanueOrder);
                            formdata.append('vanueClass',this.form.vanueClass);
                            formdata.append('telNumber',this.form.telNumber);
                            formdata.append('vanuePrice',this.form.vanuePrice);
                            axios.post('http://39.107.66.152:8080/admin/addVanue1',formdata)
                            .then(function(res){
                               if(res.data == '1'){
                                   that.$message({
                                        showClose:true,
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    that.resetForm('form');
                               }else{
                                   that.$message({
                                        showClose:true,
                                        message:'添加失败！',
                                        type:'error'
                                    });
                                    that.resetForm('form');
                               }
                            })
                       }else{
                           this.$message({
                           showClose:true,
                           message:'请修改场馆图片！',
                           type:'error'
                        });
                       }
                   }else{
                       this.$message({
                           showClose:true,
                           message:'请先完成必要信息！',
                           type:'error'
                        });
                   }
               })
            // console.log(this.cropImg)
           },
            //判断是否为超级管理员登录
            chargeAdmin(){
                if(localStorage.getItem('ms_username') == 'admin'){
                    return true;
                }else{
                    return false;
                }
            },
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
                this.imgSrc = this.cropImg;
            },
            uploadAvatar(){
                this.dialogVisible = false;
                var imgBlob = this.convertBase64UrlToBlob(this.cropImg);
                console.log(this.cropImg)
                var formdata = new FormData();
                formdata.append('userID',this.useradminID);
                formdata.append('modal_file',imgBlob,'a.jpg');
                // axios.post('http://localhost:8080/admin/adminUserAvatar',formdata)
                // .then(function(res){
                //     console.log(res.data)
                // });
                console.log(imgBlob)
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
    .container{
        min-height: 600px;
    }
    .addAdministrator-form{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        margin-top: 50px;
    }
    .notice{
        margin: 0 auto;
        width: 280px;
        color: #909399;
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
