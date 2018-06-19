<template>
    <div class="login-wrap">
        <div class="ms-title">悦动后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    //前端表单验证通过
                    if (valid) { 
                        var that = this;
                        // localStorage.setItem('ms_username',username);
                        // this.$router.push('/');
                        axios.post('http://39.107.66.152:8080/login/admin',qs.stringify({username:this.ruleForm.username,password:this.ruleForm.password}))
                        .then(function(res){
                            if(res.data == '1'){
                                console.log(that.getDate());
                                localStorage.setItem(that.ruleForm.username+'LastTime',that.getDate());
                                localStorage.setItem('ms_username',that.ruleForm.username);
                                that.$router.push('/');
                            }else if(res.data == 2){
                                console.log(2);
                                localStorage.setItem('ms_username',that.ruleForm.username);
                                localStorage.setItem(that.ruleForm.username+'LastTime',that.getDate());
                                that.$router.push('/');
                            }else{
                                alert('用户名或密码错误！');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getDate(){
                let myDate = new Date();
                let month = myDate.getMonth()+1;
                return myDate.getFullYear()+'-'+month+'-'+myDate.getDate();
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>