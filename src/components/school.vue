<template>
  <div class="bigbox column mgl">
    <div class="flex center">
      <div class="width">找院校</div>
      <div class="width">找专业</div>
      <div class="width">查分数</div>
    </div>
    <div class="flex">
      <div style="width: 100px;" class="grey">地区一区</div>
      <div v-for="(item,index) in privincesOne" :key="index" style="width: 50px;cursor: pointer" :class="{'red-text': index === diqu1curIndex} " @click="selectDiqu1(item,index)">{{item}}</div>
    </div>

    <div class="flex">
      <div style="width: 100px;" class="grey">地区二区</div>
      <div v-for="(item,index) in privincesTwo" :key="index" style="width: 50px;cursor: pointer" :class="{'red-text': index === diqu2curIndex} " @click="selectDiqu2(item,index)">{{item}}</div>
    </div>
    <div class="flex">
      <div style="width: 100px;" class="grey">院校属性</div>
      <div v-for="(item,index) in schoolShuxing" :key="index" style="width: 70px;cursor: pointer" :class="{'red-text': index === shuxingcurIndex}" @click="selectShuxing(item,index)">{{item}}</div>
    </div>
    <div class="flex">
      <div style="width: 100px;" class="grey">院校类型</div>
      <div v-for="(item,index) in schoolLeixing" :key="index" style="width: 70px;cursor: pointer" :class="{'red-text': index === leixingcurIndex}" @click="selectLeixing(item,index)">{{item}}</div>
    </div>
    <div class="flex">
      <div style="width: 100px;" class="grey">院校性质</div>
      <div v-for="(item,index) in schoolXingzhi" :key="index" style="width: 70px;cursor: pointer" :class="{'red-text': index === xingzhicurIndex}" @click="selectXingzhi(item,index)">{{item}}</div>
    </div>
    <el-button type="primary" @click="searchSchool">搜索</el-button>
    <div v-for="(item,index) in schoolList" style="display: flex;cursor: pointer" class="mgt" @click="showSchoolInfo(item.schoolName)">
      <img :src="schoolImage" >
      <div class="mgl8">
        <div class="mgb">{{item.schoolName}}</div>
        <div class="grey fontsize mgb">院校属性：{{item.shuxing}}</div>
        <div class="grey fontsize mgb">所在省份：{{item.diqu}}  院校类型：{{item.leixing}}</div>
      </div>
    </div>
    <div v-if="isSchool">
      <div class="outbox" >
      </div>
      <div class="floatMsg">
        <div class="flex">
          <div class="mgl textCenter">年份</div>
          <div class="mgl textCenter">学校</div>
          <div class="mgl width200 textCenter">专业</div>
          <div class="mgl textCenter">总分</div>
          <div class="mgl textCenter">政治</div>
          <div class="mgl textCenter">外语</div>
          <div class="mgl textCenter">专业课一</div>
          <div class="mgl textCenter">专业课二</div>
        </div>
        <div v-for="(item,index) in professionList" class="flex">
          <div class="mgl">{{item.year}}</div>
          <div class="mgl">{{item.schoolName}}</div>
          <div class="mgl width200">{{item.professionName}}</div>
          <div class="mgl">{{item.totalScore}}</div>
          <div class="mgl">{{item.politicalScore}}</div>
          <div class="mgl">{{item.foreLangScore}}</div>
          <div class="mgl">{{item.professionScoreOne}}</div>
          <div class="mgl">{{item.professionScoreTwo}}</div>
        </div>
      </div>
      <i class="fa fa-times-circle position91"  @click="close"></i>
    </div>
  </div>


</template>

<script>
import {professionList,getProfessionByName} from "../api/profession";
import {getSchools,getSchoolByInfo} from '../api/school.js'
export default {
    data(){
        return {
          professionList:[],
          professionMap:new Map(),
          privincesOne:['北京','河北','上海','山东','辽宁','浙江','天津'
          ,'山西','陕西','四川','江苏','吉林','江西','湖南','湖北','河南','广东'
          ,'福建','重庆','安徽','黑龙江'],
          privincesTwo:['海南','贵州','云南','西藏','甘肃',
            '青海','宁夏','新疆','广西','内蒙古'],
          schoolShuxing:['211工程','985工程','34所自主划线','其他'],
          schoolLeixing:['理工类','艺体类','综合类','师范类','农林类','文法类',
            '民族类','医药类','军事类','其他'],
          schoolXingzhi:['高等院校','科研院所'],
          diqu1curIndex:null,
          diqu2curIndex:null,
          shuxingcurIndex:null,
          leixingcurIndex:null,
          xingzhicurIndex:null,
          diqu:null,
          shuxing:null,
          leixing:null,
          xingzhi:null,
          schoolList:[],
          schoolImage:'http://192.168.200.138:19000/headimages/school.png',
          isSchool:false
        }
    },
    methods:{
      close(){
        this.isSchool = false
      },
      getProfessionByName(index,name){
        getProfessionByName(name).then((response)=>{
          this.professionMap.set(index,response)
        })
      },
      selectDiqu1(item,index){
        this.diqu1curIndex = index;
        this.diqu = item;
        if (this.diqu2curIndex!=null){
          this.diqu2curIndex = null
        }
      },
      selectDiqu2(item,index){
        this.diqu2curIndex = index;
        this.diqu = item
        if (this.diqu1curIndex!=null){
          this.diqu1curIndex = null
        }
      },
      selectShuxing(item,index){
        this.shuxingcurIndex=index;
        this.shuxing=item
      },
      selectLeixing(item,index){
        this.leixing = item;
        this.leixingcurIndex=index
      },
      selectXingzhi(item,index){
        this.xingzhi = item;
        this.xingzhicurIndex = index
      },
      searchSchool(){
        getSchoolByInfo(this.diqu,this.shuxing,this.leixing,this.xingzhi).then((response)=>{
          this.schoolList = response
          console.log(this.schoolList)
        })
      },
      showSchoolInfo(name){
        getProfessionByName(name).then((response)=>{
          this.professionList = response;
        });
        this.isSchool = true
      }
    },
    components:{

    },
    created(){
    }
}
</script>

<style>
.bigbox{
  background: rgb(239, 239, 239);
  display: flex;
}

.schoolSchollDetail {
  width: 300px;
  height: 100px;
  box-shadow: 0px 0px 27px 19px #ccc;
  border-radius: 50px;
  border-width: 24px;
  border-style: solid;
  border-color: #4e81bb;
  outline: 30px;

  font-family: '微软雅黑';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  letter-spacing: 3px;
  line-height: 50%;
  text-overflow: ellipsis;
  text-align: center;
  text-align-last: inherit;
  text-transform: capitalize;
  writing-mode: horizontal-tb;
  caret-color: #000000;
  text-shadow: 0px 0px 0px

}

.width {
  width: 100px;
  cursor: pointer;
  color: red;
  font-size: 20px;

}
.width200{
  width: 200px;
}

.column{
  flex-direction: column ;
}

.flex {
  display: flex;
  height: 40px
}

.center {
  justify-content: center;
}
.textCenter{
  text-align: center;
}

.mgl{
  margin-left: 50px;
}
.grey{
  color: darkgrey;
}

.red-text{
  color: red;
}

.fontsize{
  font-size: 12px;
}

.mgl8 {
  margin-left: 10px;
}

.mgb {
  margin-bottom: 5px;
}

.mgt {
  margin-top: 5px;
}

.outbox{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: black;
  position: fixed;
  z-index: 999;

}
.floatMsg{
  position:fixed;
  top: 50%;
  left: 50%;
  background: rgb(255,255,255);
  border-radius: 20px;
  width: 90%;
  height: 100%;
  transform: translate(-50%,-50%);
  text-align: center;
  z-index: 1000;
  box-shadow: 0px 0px 5px 1px black;
  overflow:auto;
}
.position91{
  left: 95%;
  position: absolute;
  font-size: 20px;
}
</style>
