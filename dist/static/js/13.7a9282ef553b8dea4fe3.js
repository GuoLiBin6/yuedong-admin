webpackJsonp([13],{eSMP:function(e,r){},swzU:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=s("mw3O"),a=s.n(t),o=s("mtWM"),m=s.n(o),n={data:function(){var e=this;return{form:{username:"",password:"",checkPassword:""},rules:{username:[{required:!0,message:"请输入用户名",tigger:"blur"},{min:3,max:20,message:"长度在3-20个字符",tigger:"blur"}],password:[{required:!0,message:"请输入密码",tigger:"blur"},{min:6,max:20,message:"长度在6-20个字符",tigger:"blur"}],checkPassword:[{validator:function(r,s,t){console.log(1),s!==e.form.password?t(new Error("两次输入密码不一致!")):t()},tigger:"blur"}]}}},methods:{resetForm:function(e){this.$refs[e].resetFields()},addAdministrator:function(e){var r=this;this.$refs[e].validate(function(e){if(e)if(r.chargeAdmin()){var s=r;m.a.post("http://localhost:8080/admin/addAdministrator",a.a.stringify({username:r.form.username,password:r.form.password})).then(function(e){"1"==e.data?(s.$message({showClose:!0,message:"添加成功",type:"success"}),s.resetForm("form")):(s.$message({showClose:!0,message:"添加失败！",type:"error"}),s.resetForm("form"))})}else r.$message({showClose:!0,message:"没有足够权限！",type:"error"});else r.$message({showClose:!0,message:"请先完成必要信息！",type:"error"})})},chargeAdmin:function(){return"admin"==localStorage.getItem("ms_username")}}},i={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"table"},[s("div",{staticClass:"crumbs"},[s("el-breadcrumb",{attrs:{separator:"/"}},[s("el-breadcrumb-item",[e._v("用户管理")]),e._v(" "),s("el-breadcrumb-item",[e._v("添加用户")])],1)],1),e._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"addAdministrator-form"},[s("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"用户名:",prop:"username"}},[s("el-input",{model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密  码:",prop:"password"}},[s("el-input",{model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码:",prop:"checkPassword"}},[s("el-input",{model:{value:e.form.checkPassword,callback:function(r){e.$set(e.form,"checkPassword",r)},expression:"form.checkPassword"}})],1),e._v(" "),s("el-form-item",[s("el-button",{on:{click:function(r){e.resetForm("form")}}},[e._v("重置")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(r){e.addAdministrator("form")}}},[e._v("立即添加")])],1)],1)],1),e._v(" "),s("div",{staticClass:"notice"},[e._v("\n            注： 添加管理员等级为普通管理员！\n        ")])])])},staticRenderFns:[]};var l=s("VU/8")(n,i,!1,function(e){s("eSMP")},"data-v-07fb5b8b",null);r.default=l.exports}});