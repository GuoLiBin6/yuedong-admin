<template>
    <div class="table">
        <div class="crumbs">
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>场地管理</el-breadcrumb-item>
                <el-breadcrumb-item>场地列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作栏 -->
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="addDelAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="按名称或地址搜索" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="vanueID" label="场馆ID">
                </el-table-column>
                <el-table-column prop="vanueName" label="场馆名">
                </el-table-column>
                <el-table-column prop="vanuePlace" label="场馆地址">
                </el-table-column>
                <el-table-column prop="vanueAssess" label="星级">
                </el-table-column>
                <el-table-column prop="vanueOrder" label="约成单数">
                </el-table-column>
                <el-table-column prop="vanuePrice" label="场费">
                </el-table-column>
                <el-table-column prop="vanueClass" label="描述">
                </el-table-column>
                <el-table-column prop="telNumber" label="联系方式">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页导航 -->
            <div class="pagination" v-if="seen">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="50" :page-size="7" :current-page="cur_page">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑场馆" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item  label="场馆ID为：">
                    {{form.vanueID}}
                </el-form-item>
                <el-form-item label="场馆名：">
                    <el-input v-model="form.vanueName"></el-input>
                </el-form-item>
                <el-form-item label="场馆地址：">
                    <el-input v-model="form.vanuePlace"></el-input>
                </el-form-item>
                <el-form-item label="场馆星级：">
                    <el-input v-model="form.vanueAssess"></el-input>
                </el-form-item>
                <el-form-item label="约成单数：">
                    <el-input v-model="form.vanueOrder"></el-input>
                </el-form-item>
                <el-form-item label="场馆费用：">
                    <el-input v-model="form.vanuePrice"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="form.telNumber"></el-input>
                </el-form-item>
                <el-form-item label="场馆标签：">
                    <el-input v-model="form.vanueClass"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确定修改 </el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除场馆不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="delAllVisible" width="300px" center>
            <div class="del-dialog-cnt">批量删除场馆不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delAllVisible = false">取 消</el-button>
                <el-button type="primary" @click="delAll">确 定</el-button>
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
                showData:[],
                page_size:7,
                cur_page:1,
                seen:true,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delArr:[],
                delVisible: false,
                delAllVisible:false,
                form: {},
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 分页导航(数据库分页)
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 数据库管理员信息
            getData() {
                var that = this;
                this.$axios.post('http://39.107.66.152:8080/admin/store',qs.stringify({page_size:7,cur_page:that.cur_page})).then((res) => {
                    that.tableData = res.data;
                });
            },
            search() {
                if(!this.select_word){
                    this.seen = true;
                    this.getData();
                }else{
                    this.seen = false;
                    var that = this;
                    let p = new Promise((resolve,reject)=>{
                        that.$axios.post('http://39.107.66.152:8080/admin/store',qs.stringify({page_size:'all',cur_page:that.cur_page})).then((res) => {
                            that.tableData = res.data;
                            resolve();
                        });
                    });
                   
                    p.then(function(result){
                            that.tableData = that.filterForm('vanueName','vanuePlace');
                    })
                }
            },
            formatter(row, column) {
                return row.address;
            },
            filterForm(word1,word2){
                return this.tableData.filter((d) => {
                            let is_del = false;
                            for (let i = 0; i < this.del_list.length; i++) {
                                if (d.word1 === this.del_list[i].word1) {
                                    is_del = true;
                                    break;
                                }
                            }
                            if (!is_del) {
                                if (d[word1].indexOf(this.select_word) > -1 || d[word2].indexOf(this.select_word) > -1) {
                                    return d;
                                }
                            }
                        });
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
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                    this.idx = index;
                    const item = this.tableData[index];
                    this.form = {
                        vanueID:item.vanueID,
                        vanueName:item.vanueName,
                        vanuePlace:item.vanuePlace,
                        vanueAssess:item.vanueAssess,
                        vanueOrder:item.vanueOrder,
                        vanuePrice:item.vanuePrice,
                        vanueClass:item.vanueClass,
                        telNumber:item.telNumber
                    }
                    this.editVisible = true;
                
                
            },
            handleDelete(index, row) {
                    this.idx = index;
                    this.delVisible = true;
                
                
            },
            addDelAll(){
                this.delAllVisible = true;
            },
            delAll() {
                let delArr = [];
                for(var i=0;i<this.multipleSelection.length;i++){
                    delArr.push(this.multipleSelection[i].vanueID);
                }
                this.delForm(delArr);
                this.delAllVisible = false;
            },
            delForm(arr){
                if(arr == []){
                   this.$message.error(`请先选择场馆！`); 
                }else{
                    var that = this;
                    this.$axios.post('http://39.107.66.152:8080/admin/rmVanue',
                        qs.stringify({
                           delArr:arr
                            })).then((res) => {
                            that.$message.success(`删除成功`);
                            that.getData();
                        });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                var that = this;
                this.$axios.post('http://39.107.66.152:8080/admin/changeVanue',
                    qs.stringify({
                        vanueID:that.form.vanueID,
                        vanueName:that.form.vanueName,
                        vanuePlace:that.form.vanuePlace,
                        vanueAssess:that.form.vanueAssess,
                        vanuePrice:that.form.vanuePrice,
                        vanueClass:that.form.vnaueClass,
                        vanueOrder:that.form.vanueOrder,
                        telNumber:that.form.telNumber
                        })).then((res) => {
                        that.$message.success(`修改成功`);
                    });
            },
            // 确定删除
            deleteRow(){
                let delArr = []
                delArr.push(this.tableData[this.idx].vanueID);
                this.delForm(delArr);
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
</style>
