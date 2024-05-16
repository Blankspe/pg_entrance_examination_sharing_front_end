<template>
  <div class="box">
    <div class="outbox" v-show="isShow">
    </div>
    <div class="float" v-show="isShow">
        
        <img :src="postToShow.profilePict" class="pictInDetail">
        <div class="nameInDetail" >{{postToShow.userName}} </div>
        <div class="schoolInDetail">本科院校：{{postToShow.school}} 目标院校：{{postToShow.targetSchool}} 总分：{{postToShow.allScore}} </div>
        <div class="titleInDetail">{{postToShow.title}} </div>
        <div class="contentNotHid">{{postToShow.contents}} </div>
        <div class="allComments">
            全部评论（ {{comments.length}} ）
        </div>
        <div>
            <div v-for="(item,index) in comments" :key="item.userId">
                <img :src="item.profilePict" class="pictInDetail">
                <div class="nameInDetail" >{{item.userName}} </div>
                <div class="schoolInDetail">本科院校：{{item.school}} 目标院校：{{item.targetSchool}} 总分：{{item.allScore}} </div>
                <div class="comment">{{item.content}}</div>
                
                <hr style="opacity:0.2;margin-bottom:20px;" >
            </div>
            <input type="text" placeholder="请输入回复内容" v-model="reply">
            <button @click="replyPost(null,postId,1,1,reply)">提交</button>
        </div>
    </div>
    <div class="closebutton" v-show="isShow" @click="close">
        ×
    </div>
    <el-row v-for="(item,index) in searchPosts" class="post" :key="item.postId">
        <img :src="item.profilePict" class="pict">
        <div class="name">{{item.userName}} </div>
        <div class="schoolInsearch">本科院校：{{item.school}} 目标院校：{{item.targetSchool}} 总分：{{item.allScore}} </div>
        
        <div class="title">{{item.title}} </div>
        <div class="content" @click="toOther(index,item.postId)">{{item.contents}} </div>
    </el-row>
  </div>
</template>

<script>

import {getPostByCategory} from '../api/post'
import {getCategoryNameById} from '../api/category'
import {getComments,sendComment} from '../api/comment.js'
import {postSearch} from '../api/search'

export default {
    data(){
        return {
            isShow:false,
            searchPosts:[],
            categoryId:null,
            categoryName:null,
            comments:[],
            uselessKey:0,
            postToShow:{},
            inputbox:null
        }
    },
    
    methods:{
        getPost(categoryId){
            getPostByCategory(categoryId).then((response)=>{
            this.searchPosts = response;
        })
        },
        getAllComments(postId){
            getComments(postId).then((response)=>{
                this.comments = response; 
            })
        },
        
        toOther(index,postId){
            this.isShow = !this.isShow;
            this.postToShow = this.searchPosts[index];
            this.postId = postId;
            this.getAllComments(postId);
        },
        close(){
            this.isShow = !this.isShow
        },
        replyPost(type,postId,rootId,toCommentId,content){
            sendComment(null,postId,rootId,toCommentId,content);
            this.getAllComments(postId);
            
        },
        getCategoryNameById(categoryId){
            getCategoryNameById(categoryId).then((response)=>{
            this.categoryName = response
        })
        },
        postSearchInsearch(inputbox){
            postSearch(inputbox).then((response)=>{
                this.searchPosts = response;
            })
        }
        
    },
    created(){
        this.categoryId = this.$route.query.categoryId;
        if(this.categoryId!=null){
            this.getPost(this.categoryId);
        }
        this.inputbox = this.$route.query.inputbox;
        if(this.inputbox!=null){
            this.postSearchInsearch(this.inputbox);
        }
    },
    mounted(){
        
        getCategoryNameById(this.categoryId).then((response)=>{
            this.categoryName = response
        })
    }
}
</script>

<style>
.comment{
    margin: 20px;
    text-align: left;
    
}
.allComments{
    text-align: left;
    font-weight: bolder;
    font-size: 20px;
    margin: 15px;
}

.float{
    position:fixed;
    top: 50%;
    left: 50%;
    background: rgb(255,255,255);
    border-radius: 20px;
    width: 50%;
    height: 100%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 1000;
    box-shadow: 0px 0px 5px 1px black;
    overflow:auto;
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
.closebutton{
    width: 27px;
    height: 27px;
    border-radius: 7px;
    background: white;
    text-align: center;
    position: fixed;
    line-height: 25px;
    left: 76%;
    z-index: 1000;
    top: 1px;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0px 0px 5px 1px black;
}
.closebutton:hover{
    color: skyblue;
}

.post{
    background: white;
    /* border-width: 100px; */
    /* margin-bottom: 80px; */
    padding: 30px;
    margin: 20px;
    border-radius: 20px;
    
}
.post:hover{
    box-shadow: 0px 3px 10px 1px skyblue;
    bottom: 3px;
    /* margin-top: 20px; */
}
.name{
    border-radius: 15px;
    font-size: 14px;
    height: 25px;
    padding-left: 50px;
}

.nameInDetail{
    border-radius: 15px;
    font-size: 14px;
    height: 25px;
    left: 0;
}

.schoolInsearch{
    color: gray;
    font-size: 12px;
    /* margin-left: 50px; */
    padding-left: 50px;
}
.schoolInDetail{
    color: gray;
    font-size: 12px;
    /* margin-left: 50px; */
    padding-left: 50px;
}
.pict{
    /* height: 100px; */
    width: 40px;
    display: inline;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 1px deepskyblue;
    position: absolute;
}
.pictInDetail{
    width: 40px;
    display: inline;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 1px deepskyblue;
    position: absolute;
    left: 70px;
}
.title{
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 17px;
}
.titleInDetail{
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 17px;
    text-align: left;
    margin-left: 20px;
}
.content{
    font-size: 16px;
    width: 100%;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    transition: color 0.3s;
}
.contentNotHid{
    font-size: 16px;
    width: 90%;
    margin: 16px;
    line-height: 150%;
    position: relative;
    text-align: left;
}
.content:hover{
    color: deepskyblue;
}

.box{
    margin: 10px;
}
</style>