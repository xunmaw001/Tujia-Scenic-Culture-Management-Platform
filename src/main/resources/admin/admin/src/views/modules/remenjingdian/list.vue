<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-row  :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                <el-form-item :label="contents.inputTitle == 1 ? '景点名称' : ''">
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 1" prefix-icon="el-icon-search" v-model="searchForm.jingdianmingcheng" placeholder="景点名称" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 2" suffix-icon="el-icon-search" v-model="searchForm.jingdianmingcheng" placeholder="景点名称" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 0" v-model="searchForm.jingdianmingcheng" placeholder="景点名称" clearable></el-input>
                </el-form-item>
		<el-form-item class="select" label="等级" prop="dengji">
		  <el-select  @change="dengjiChange" clearable v-model="searchForm.dengji" placeholder="请选择等级">
		    <el-option
			v-for="(item,index) in dengjiOptions"
			v-bind:key="index"
			:label="item"
			:value="item">
		    </el-option>
		  </el-select>
		</el-form-item>
                <el-form-item :label="contents.inputTitle == 1 ? '景点位置' : ''">
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 1" prefix-icon="el-icon-search" v-model="searchForm.jingdianweizhi" placeholder="景点位置" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 2" suffix-icon="el-icon-search" v-model="searchForm.jingdianweizhi" placeholder="景点位置" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 0" v-model="searchForm.jingdianweizhi" placeholder="景点位置" clearable></el-input>
                </el-form-item>
          <el-form-item>
            <el-button v-if="contents.searchBtnIcon == 1 && contents.searchBtnIconPosition == 1" icon="el-icon-search" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}</el-button>
            <el-button v-if="contents.searchBtnIcon == 1 && contents.searchBtnIconPosition == 2" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}<i class="el-icon-search el-icon--right"/></el-button>
            <el-button v-if="contents.searchBtnIcon == 0" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}</el-button>
          </el-form-item>
        </el-row>

        <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
          <el-form-item>
            <el-button
              v-if="isAuth('remenjingdian','新增') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1"
              type="success"
              icon="el-icon-plus"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}</el-button>
            <el-button
              v-if="isAuth('remenjingdian','新增') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2"
              type="success"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}<i class="el-icon-plus el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('remenjingdian','新增') && contents.btnAdAllIcon == 0"
              type="success"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}</el-button>
            <el-button
              v-if="isAuth('remenjingdian','删除') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              icon="el-icon-delete"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}</el-button>
            <el-button
              v-if="isAuth('remenjingdian','删除') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}<i class="el-icon-delete el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('remenjingdian','删除') && contents.btnAdAllIcon == 0 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}</el-button>





          </el-form-item>
        </el-row>
      </el-form>
      <div class="table-content">
        <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
            :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
            :border="contents.tableBorder"
            :fit="contents.tableFit"
            :stripe="contents.tableStripe"
            :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
            v-if="isAuth('remenjingdian','查看')"
            :data="dataList"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandler">
            <el-table-column  v-if="contents.tableSelection"
                type="selection"
                :header-align="contents.tableAlign"
                align="center"
                width="50">
            </el-table-column>
            <el-table-column label="索引" :align="contents.tableAlign"  v-if="contents.tableIndex" type="index" width="50" />
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="jingdianmingcheng"
                   :header-align="contents.tableAlign"
		    label="景点名称">
		     <template slot-scope="scope">
                       {{scope.row.jingdianmingcheng}}
                     </template>
                </el-table-column>
                  <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign"  prop="tupian"
                   :header-align="contents.tableAlign"
                    width="200"
                    label="图片">
                    <template slot-scope="scope">
                      <div v-if="scope.row.tupian">
                        <img :src="$base.url+scope.row.tupian.split(',')[0]" width="100" height="100">
                      </div>
                      <div v-else>无图片</div>
                    </template>
                  </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="dengji"
                   :header-align="contents.tableAlign"
		    label="等级">
		     <template slot-scope="scope">
                       {{scope.row.dengji}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="jingdianleixing"
                   :header-align="contents.tableAlign"
		    label="景点类型">
		     <template slot-scope="scope">
                       {{scope.row.jingdianleixing}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="kaifangshijian"
                   :header-align="contents.tableAlign"
		    label="开放时间">
		     <template slot-scope="scope">
                       {{scope.row.kaifangshijian}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="menpiaojiage"
                   :header-align="contents.tableAlign"
		    label="门票价格">
		     <template slot-scope="scope">
                       {{scope.row.menpiaojiage}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="shuliang"
                   :header-align="contents.tableAlign"
		    label="数量">
		     <template slot-scope="scope">
                       {{scope.row.shuliang}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="jingdianweizhi"
                   :header-align="contents.tableAlign"
		    label="景点位置">
		     <template slot-scope="scope">
                       {{scope.row.jingdianweizhi}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign" 
                    prop="jingdianpingfen"
                   :header-align="contents.tableAlign"
		    label="景点评分">
		     <template slot-scope="scope">
                       {{scope.row.jingdianpingfen}}
                     </template>
                </el-table-column>
            <el-table-column width="300" :align="contents.tableAlign" 
               :header-align="contents.tableAlign"
                label="操作">
                <template slot-scope="scope">
                <el-button v-if="isAuth('remenjingdian','查看') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','查看') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}<i class="el-icon-tickets el-icon--right" /></el-button>
                <el-button v-if="isAuth('remenjingdian','查看') && contents.tableBtnIcon == 0" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','立即购买') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="success" icon="el-icon-tickets" size="mini" @click="menpiaodingdanCrossAddOrUpdateHandler(scope.row,'cross','','','')">{{ contents.tableBtnFont == 1?'立即购买':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','立即购买') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="success" size="mini" @click="menpiaodingdanCrossAddOrUpdateHandler(scope.row,'cross','','','')">{{ contents.tableBtnFont == 1?'立即购买':'' }}<i class="el-icon-tickets el-icon--right" /></el-button>
                <el-button v-if="isAuth('remenjingdian','立即购买') && contents.tableBtnIcon == 0" type="success" size="mini" @click="menpiaodingdanCrossAddOrUpdateHandler(scope.row,'cross','','','')">{{ contents.tableBtnFont == 1?'立即购买':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','景点评价') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="success" icon="el-icon-tickets" size="mini" @click="jingdianpingjiaCrossAddOrUpdateHandler(scope.row,'cross','','[1]','已评价')">{{ contents.tableBtnFont == 1?'景点评价':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','景点评价') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="success" size="mini" @click="jingdianpingjiaCrossAddOrUpdateHandler(scope.row,'cross','','[1]','已评价')">{{ contents.tableBtnFont == 1?'景点评价':'' }}<i class="el-icon-tickets el-icon--right" /></el-button>
                <el-button v-if="isAuth('remenjingdian','景点评价') && contents.tableBtnIcon == 0" type="success" size="mini" @click="jingdianpingjiaCrossAddOrUpdateHandler(scope.row,'cross','','[1]','已评价')">{{ contents.tableBtnFont == 1?'景点评价':'' }}</el-button>
                <el-button v-if=" isAuth('remenjingdian','修改') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}</el-button>
                <el-button v-if=" isAuth('remenjingdian','修改') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}<i class="el-icon-edit el-icon--right" /></el-button>
                <el-button v-if=" isAuth('remenjingdian','修改') && contents.tableBtnIcon == 0" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}</el-button>


                <el-button v-if="isAuth('remenjingdian','查看评论') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="primary" icon="el-icon-edit" size="mini" @click="disscussListHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'查看评论':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','查看评论') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="primary" size="mini" @click="disscussListHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'查看评论':'' }}<i class="el-icon-edit el-icon--right" /></el-button>
                <el-button v-if="isAuth('remenjingdian','查看评论') && contents.tableBtnIcon == 0" type="primary" size="mini" @click="disscussListHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'查看评论':'' }}</el-button>


                <el-button v-if="isAuth('remenjingdian','删除') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}</el-button>
                <el-button v-if="isAuth('remenjingdian','删除') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="danger" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}<i class="el-icon-delete el-icon--right" /></el-button>
                <el-button v-if="isAuth('remenjingdian','删除') && contents.tableBtnIcon == 0" type="danger" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          clsss="pages"
          :layout="layouts"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="Number(contents.pageEachNum)"
          :total="totalPage"
          :small="contents.pageStyle"
          class="pagination-content"
          :background="contents.pageBtnBG"
          :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

    <menpiaodingdan-cross-add-or-update v-if="menpiaodingdanCrossAddOrUpdateFlag" :parent="this" ref="menpiaodingdanCrossaddOrUpdate"></menpiaodingdan-cross-add-or-update>
    <jingdianpingjia-cross-add-or-update v-if="jingdianpingjiaCrossAddOrUpdateFlag" :parent="this" ref="jingdianpingjiaCrossaddOrUpdate"></jingdianpingjia-cross-add-or-update>




  </div>
</template>
<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
import menpiaodingdanCrossAddOrUpdate from "../menpiaodingdan/add-or-update";
import jingdianpingjiaCrossAddOrUpdate from "../jingdianpingjia/add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      addOrUpdateFlag:false,
      menpiaodingdanCrossAddOrUpdateFlag: false,
      jingdianpingjiaCrossAddOrUpdateFlag: false,
      contents:{"searchBtnFontColor":"rgba(0, 0, 0, 1)","pagePosition":"2","inputFontSize":"14px","inputBorderRadius":"20px","tableBtnDelFontColor":"rgba(0, 0, 0, 1)","tableBtnIconPosition":"1","searchBtnHeight":"42px","tableBgColor":"rgba(255, 255, 255, 1)","inputIconColor":"rgba(0, 0, 0, 1)","searchBtnBorderRadius":"20px","tableStripe":false,"btnAdAllWarnFontColor":"rgba(0, 0, 0, 1)","tableBtnDelBgColor":"rgba(56, 182, 230, 1)","searchBtnIcon":"1","tableSize":"medium","searchBtnBorderStyle":"double","text":{"padding":"0","boxShadow":"0 0 0px rgba(0,0,0,.1)","margin":"0 auto","borderColor":"rgba(0,0,0,.3)","backgroundColor":"rgba(247, 247, 247, 0)","color":"rgba(0, 0, 0, 1)","borderRadius":"0","borderWidth":"0","width":"650px","lineHeight":"50px","fontSize":"26px","borderStyle":"solid"},"tableSelection":true,"searchBtnBorderWidth":"5px 000","tableContentFontSize":"14px","searchBtnBgColor":"#fff","inputTitleSize":"15px","btnAdAllBorderColor":"rgba(56, 182, 230, 1)","pageJumper":true,"btnAdAllIconPosition":"1","searchBoxPosition":"2","tableBtnDetailFontColor":"rgba(0, 0, 0, 1)","tableBtnHeight":"40px","pagePager":true,"searchBtnBorderColor":"rgba(56, 182, 230, 1)","tableHeaderFontColor":"rgba(0, 1, 4, 1)","inputTitle":"1","tableBtnBorderRadius":"5px","btnAdAllFont":"1","btnAdAllDelFontColor":"rgba(0, 0, 0, 1)","tableBtnIcon":"1","btnAdAllHeight":"46px","btnAdAllWarnBgColor":"rgba(255, 255, 255, 1)","btnAdAllBorderWidth":"5px 000","tableStripeFontColor":"rgba(0, 0, 0, 1)","tableBtnBorderStyle":"double","inputHeight":"42px","btnAdAllBorderRadius":"20px","btnAdAllDelBgColor":"rgba(255, 255, 255, 1)","pagePrevNext":true,"btnAdAllAddBgColor":"rgba(255, 255, 255, 1)","searchBtnFont":"1","tableIndex":true,"btnAdAllIcon":"0","tableSortable":false,"pageSizes":true,"tableFit":true,"pageBtnBG":true,"searchBtnFontSize":"15px","tableBtnEditBgColor":"rgba(56, 182, 230, 1)","box":{"padding":"10px 20px","boxShadow":"0 0 6px rgba(0,0,0,0)","flag":1,"backgroundImage":"http://codegen.caihongy.cn/20211124/229bbb98f09a41bc83995f14c422a0a1.jpg","background":"#fff"},"inputBorderWidth":"5px 000","inputFontPosition":"1","inputFontColor":"rgba(0, 0, 0, 1)","pageEachNum":10,"tableHeaderBgColor":"rgba(119, 197, 227, 1)","inputTitleColor":"rgba(0, 0, 0, 1)","btnAdAllBoxPosition":"1","tableBtnDetailBgColor":"rgba(56, 182, 230, 1)","inputIcon":"1","searchBtnIconPosition":"2","btnAdAllFontSize":"14px","inputBorderStyle":"double","tableHoverFontColor":"#333","inputBgColor":"rgba(255, 255, 255, 1)","pageStyle":false,"pageTotal":true,"btnAdAllAddFontColor":"rgba(0, 0, 0, 1)","tableBtnFont":"1","tableContentFontColor":"rgba(0, 0, 0, 1)","inputBorderColor":"rgba(56, 182, 230, 1)","tableShowHeader":true,"tableHoverBgColor":"rgba(119, 197, 227, 0.8)","tableBtnFontSize":"14px","tableBtnBorderColor":"rgba(255, 255, 255, 1)","inputIconPosition":"2","tableBorder":true,"btnAdAllBorderStyle":"double","tableBtnBorderWidth":"5px","tableStripeBgColor":"rgba(119, 197, 227, 0.8)","tableBtnEditFontColor":"rgba(0, 0, 0, 1)","tableAlign":"center"},
      layouts: '',


    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {

  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
    menpiaodingdanCrossAddOrUpdate,
    jingdianpingjiaCrossAddOrUpdate,
  },
  methods: {

    contentStyleChange() {
      this.contentSearchStyleChange()
      this.contentBtnAdAllStyleChange()
      this.contentSearchBtnStyleChange()
      this.contentTableBtnStyleChange()
      this.contentPageStyleChange()
    },
    contentSearchStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el=>{
          let textAlign = 'left'
          if(this.contents.inputFontPosition == 2) textAlign = 'center'
          if(this.contents.inputFontPosition == 3) textAlign = 'right'
          el.style.textAlign = textAlign
          el.style.height = this.contents.inputHeight
          el.style.lineHeight = this.contents.inputHeight
          el.style.color = this.contents.inputFontColor
          el.style.fontSize = this.contents.inputFontSize
          el.style.borderWidth = this.contents.inputBorderWidth
          el.style.borderStyle = this.contents.inputBorderStyle
          el.style.borderColor = this.contents.inputBorderColor
          el.style.borderRadius = this.contents.inputBorderRadius
          el.style.backgroundColor = this.contents.inputBgColor
        })
        if(this.contents.inputTitle) {
          document.querySelectorAll('.form-content .slt .el-form-item__label').forEach(el=>{
            el.style.color = this.contents.inputTitleColor
            el.style.fontSize = this.contents.inputTitleSize
            el.style.lineHeight = this.contents.inputHeight
          })
        }
        setTimeout(()=>{
          document.querySelectorAll('.form-content .slt .el-input__prefix').forEach(el=>{
            el.style.color = this.contents.inputIconColor
            el.style.lineHeight = this.contents.inputHeight
          })
          document.querySelectorAll('.form-content .slt .el-input__suffix').forEach(el=>{
            el.style.color = this.contents.inputIconColor
            el.style.lineHeight = this.contents.inputHeight
          })
          document.querySelectorAll('.form-content .slt .el-input__icon').forEach(el=>{
            el.style.lineHeight = this.contents.inputHeight
          })
        },10)

      })
    },
    // 搜索按钮
    contentSearchBtnStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .slt .el-button--success').forEach(el=>{
          el.style.height = this.contents.searchBtnHeight
          el.style.color = this.contents.searchBtnFontColor
          el.style.fontSize = this.contents.searchBtnFontSize
          el.style.borderWidth = this.contents.searchBtnBorderWidth
          el.style.borderStyle = this.contents.searchBtnBorderStyle
          el.style.borderColor = this.contents.searchBtnBorderColor
          el.style.borderRadius = this.contents.searchBtnBorderRadius
          el.style.backgroundColor = this.contents.searchBtnBgColor
        })
      })
    },
    // 新增、批量删除
    contentBtnAdAllStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .ad .el-button--success').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllAddFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllAddBgColor
        })
        document.querySelectorAll('.form-content .ad .el-button--danger').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllDelFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllDelBgColor
        })
        document.querySelectorAll('.form-content .ad .el-button--warning').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllWarnFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllWarnBgColor
        })
      })
    },
    // 表格
    // rowStyle({ row, rowIndex}) {
    //   if (rowIndex % 2 == 1) {
    //     if(this.contents.tableStripe) {
    //       return {color:this.contents.tableStripeFontColor}
    //     }
    //   } else {
    //     return ''
    //   }
    // },
    // cellStyle({ row, rowIndex}){
    //   if (rowIndex % 2 == 1) {
    //     if(this.contents.tableStripe) {
    //       return {backgroundColor:this.contents.tableStripeBgColor}
    //     }
    //   } else {
    //     return ''
    //   }
    // },
    headerRowStyle({ row, rowIndex}){
      return {color: this.contents.tableHeaderFontColor}
    },
    headerCellStyle({ row, rowIndex}){
      return {backgroundColor: this.contents.tableHeaderBgColor}
    },
    // 表格按钮
    contentTableBtnStyleChange(){
      // this.$nextTick(()=>{
      //   setTimeout(()=>{
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--success').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnDetailFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnDetailBgColor
      //     })
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--primary').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnEditFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnEditBgColor
      //     })
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--danger').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnDelFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnDelBgColor
      //     })

      //   }, 50)
      // })
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      if(this.contents.pageTotal) arr.push('total')
      if(this.contents.pageSizes) arr.push('sizes')
      if(this.contents.pagePrevNext){
        arr.push('prev')
        if(this.contents.pagePager) arr.push('pager')
        arr.push('next')
      }
      if(this.contents.pageJumper) arr.push('jumper')
      this.layouts = arr.join()
      this.contents.pageEachNum = 10
    },

    menpiaodingdanCrossAddOrUpdateHandler(row,type,crossOptAudit,statusColumnName,tips,statusColumnValue){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.menpiaodingdanCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','remenjingdian');
      this.$storage.set('statusColumnName',statusColumnName);
      this.$storage.set('statusColumnValue',statusColumnValue);
      this.$storage.set('tips',tips);
	if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
		var obj = this.$storage.getObj('crossObj');
		for (var o in obj){
		  if(o==statusColumnName && obj[o]==statusColumnValue){
		    this.$message({
		      message: tips,
		      type: "success",
		      duration: 1500,
		      onClose: () => {
			this.getDataList();
		      }
		    });
		      this.showFlag = true;
		      this.menpiaodingdanCrossAddOrUpdateFlag = false;
			return;
		  }
		}
	}
      this.$nextTick(() => {
      this.$refs.menpiaodingdanCrossaddOrUpdate.init(row.id,type);
      });
    },
    jingdianpingjiaCrossAddOrUpdateHandler(row,type,crossOptAudit,statusColumnName,tips,statusColumnValue){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.jingdianpingjiaCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','remenjingdian');
      this.$storage.set('statusColumnName',statusColumnName);
      this.$storage.set('statusColumnValue',statusColumnValue);
      this.$storage.set('tips',tips);
	if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
		var obj = this.$storage.getObj('crossObj');
		for (var o in obj){
		  if(o==statusColumnName && obj[o]==statusColumnValue){
		    this.$message({
		      message: tips,
		      type: "success",
		      duration: 1500,
		      onClose: () => {
			this.getDataList();
		      }
		    });
		      this.showFlag = true;
		      this.jingdianpingjiaCrossAddOrUpdateFlag = false;
			return;
		  }
		}
	}
      this.$nextTick(() => {
      this.$refs.jingdianpingjiaCrossaddOrUpdate.init(row.id,type);
      });
    },
    init () {
          this.dengjiOptions = "一星,二星,三星,四星,五星".split(',')
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
      }
          if(this.searchForm.jingdianmingcheng!='' && this.searchForm.jingdianmingcheng!=undefined){
            params['jingdianmingcheng'] = '%' + this.searchForm.jingdianmingcheng + '%'
          }
          if(this.searchForm.dengji!='' && this.searchForm.dengji!=undefined){
            params['dengji'] = this.searchForm.dengji
          }
          if(this.searchForm.jingdianweizhi!='' && this.searchForm.jingdianweizhi!=undefined){
            params['jingdianweizhi'] = '%' + this.searchForm.jingdianweizhi + '%'
          }
      this.$http({
        url: "remenjingdian/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    disscussListHandler(id,type) {
	this.$router.push({path:'/discussremenjingdian',query:{refid:id}});
    },
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "remenjingdian/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
  .slt {
    margin: 0 !important;
    display: flex;
  }

  .ad {
    margin: 0 !important;
    display: flex;
  }

  .pages {
    & /deep/ el-pagination__sizes{
      & /deep/ el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }
  

  .el-button+.el-button {
    margin:0;
  } 

  .tables {
	& /deep/ .el-button--success {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 5px;
		border-style: double;
		border-color: rgba(255, 255, 255, 1);
		border-radius: 5px;
		background-color: rgba(56, 182, 230, 1);
	}
	
	& /deep/ .el-button--primary {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 5px;
		border-style: double;
		border-color: rgba(255, 255, 255, 1);
		border-radius: 5px;
		background-color: rgba(56, 182, 230, 1);
	}
	
	& /deep/ .el-button--danger {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 14px;
		border-width: 5px;
		border-style: double;
		border-color: rgba(255, 255, 255, 1);
		border-radius: 5px;
		background-color: rgba(56, 182, 230, 1);
	}

    & /deep/ .el-button {
      margin: 4px;
    }
  }
	.form-content {
		background: transparent;
	}
	.table-content {
		background: transparent;
	}
	
	.tables /deep/ .el-table__body tr {
				background-color: rgba(255, 255, 255, 1) !important;
				color: rgba(0, 0, 0, 1) !important;
	 }
	.tables /deep/ .el-table__body tr.el-table__row--striped td {
	    background: transparent;
	}
	.tables /deep/ .el-table__body tr.el-table__row--striped {
		background-color: rgba(119, 197, 227, 0.8) !important;
		color: rgba(0, 0, 0, 1) !important;
	}
	
	 .tables /deep/ .el-table__body tr:hover>td {
	   	   background-color: rgba(119, 197, 227, 0.8) !important;
	   	   	   color: #333 !important;
	   	 }
	 
</style>
