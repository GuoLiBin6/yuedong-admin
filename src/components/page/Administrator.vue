<template>
    <div class="table">
        <div class="crumbs">
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
                <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作栏 -->
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <el-select v-model="select_cate" placeholder="筛选管理员" class="handle-select mr10">
                    <el-option key="1" label="超级管理员" value="root"></el-option>
                    <el-option key="2" label="普通管理员" value="admin"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="username" label="用户名" width="150">
                </el-table-column>
                
                <el-table-column prop="class" label="等级">
                </el-table-column>
                <el-table-column prop="imgURL" label="头像">
                    <template slot-scope="scope">
                        <img  :src="scope.row.imgURL" alt="点击添加" class="user_head">
                    </template>
                </el-table-column>
               
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        
                        <!-- <el-button size="small" type="primary">上传头像<input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/></el-button> -->
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页导航 -->
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="50" :page-size="8">
                </el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="修改密码" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名为：">
                    {{form.username}}
                </el-form-item>
                <el-form-item label="填写密码：">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确定修改 </el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除管理员不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    username: '',
                    password: '',
                    class: '',
                    imgURL:''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.username === this.del_list[i].username) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.class.indexOf(this.select_cate) > -1 &&
                            (d.class.indexOf(this.select_word) > -1 ||
                                d.username.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
              
            }
        },
        methods: {
            // 分页导航
            // handleCurrentChange(val) {
            //     this.cur_page = val;
            //     this.getData();
            //     // this.getData();
            //     // this.tableData = this.tableData.slice((val-1)*2,val*2);
            // },
            // 获取 数据库管理员信息
            getData() {
                var that = this;
                this.$axios.get('http://39.107.66.152:8080/administrator').then((res) => {
                    that.tableData = res.data;
                });
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                console.log(row)
                if(this.chargeAdmin('change',row)){
                    this.idx = index;
                    const item = this.tableData[index];
                    this.form = {
                        username: item.username,
                        password: '',
                        class: item.class,
                        imgURL:item.imgURL
                    }
                    this.editVisible = true;
                }else{
                    this.$message.error('没有足够的权限！');
                }
                
            },
            handleDelete(index, row) {
                if(this.chargeAdmin('delete',row)){
                    this.idx = index;
                    this.delVisible = true;
                }else{
                    this.$message.error('没有足够的权限！');
                }
                
            },
            // delAll() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.del_list = this.del_list.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error('删除了' + str);
            //     this.multipleSelection = [];
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                var that = this;
                this.$axios.post('http://39.107.66.152:8080/admin/changePWD',
                    qs.stringify({username:that.form.username,password:that.form.password})).then((res) => {
                        that.$message.success(`修改成功`);
                    });
                
            },
            // 确定删除
            deleteRow(){
                console.log(this.tableData[this.idx])
                var that = this;
                this.$axios.post('http://39.107.66.152:8080/admin/rmAdministrator',
                    qs.stringify({username:that.tableData[that.idx].username})).then((res) => {
                        this.$message.success('删除成功');
                    });
                this.tableData.splice(this.idx, 1);
                
                this.delVisible = false;
            },
            //判断是否为超级管理员登录或正在操作本账号
            chargeAdmin(arr,row){
                if(arr == 'delete' && localStorage.getItem('ms_username') == 'admin' && localStorage.getItem('ms_username') != row.username){
                    return true;
                }else if(arr == 'change' && (localStorage.getItem('ms_username') == 'admin' || localStorage.getItem('ms_username') == row.username)){
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
    .handle-box {
        margin-bottom: 20px;
        
    }
    .user_head{
         width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .pre-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
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
        padding: 5px 10px;
        margin-left: 30px;
        background-color: #409eff;
        color: white;
        cursor: pointer;
        font-size: 10px;
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
