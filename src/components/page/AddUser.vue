<template>
    <div class="table">
        <div class="crumbs">
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="addAdministrator-form">
                <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                    <el-form-item label="用户名:" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密  码:" prop="password">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="checkPassword">
                        <el-input v-model="form.checkPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm('form')">重置</el-button>
                        <el-button type="primary" @click="addAdministrator('form')">立即添加</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div class="notice">
                注： 添加管理员等级为普通管理员！
            </div>
            
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import axios from 'axios';
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
               form:{
                   username:'',
                   password:'',
                   checkPassword:''
               },
               
               rules:{
                   username:[
                       { required: true,message: '请输入用户名',tigger:'blur'},
                       { min:3, max:20,message:'长度在3-20个字符',tigger:'blur'}
                   ],
                   password:[
                       {required: true, message: '请输入密码',tigger: 'blur'},
                       { min : 6,max:20,message:'长度在6-20个字符',tigger:'blur'}
                   ],
                   checkPassword:[
                       {validator:validatePass,tigger:'blur'}
                   ]
               }
            }
            
        },
        methods: {
           resetForm(form){
               this.$refs[form].resetFields();
           },
           addAdministrator(form){

               this.$refs[form].validate((valid)=>{
                   if(valid){
                       if(this.chargeAdmin()){
                           var that = this;
                            axios.post('http://localhost:8080/admin/addAdministrator',qs.stringify({username:this.form.username,password:this.form.password}))
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
                           message:'没有足够权限！',
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
           },
            //判断是否为超级管理员登录
            chargeAdmin(){
                if(localStorage.getItem('ms_username') == 'admin'){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

</script>

<style scoped>
    .container{
        min-height: 520px;
    }
    .addAdministrator-form{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        margin-top: 100px;
    }
    .notice{
        margin: 0 auto;
        width: 280px;
        color: #909399;
    }
</style>
