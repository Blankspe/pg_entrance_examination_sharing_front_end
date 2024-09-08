<template>
  <div class="box">
    <div v-if="isSendMessage">
      <div class="outbox" >
      </div>
      <div class="floatMsg">
        <div class = "sendMsg-title">发私信</div>
        <div class="sendMsg-to">发给    </div>
        <div class="sendMsg-name">{{ receiverInfo.userName }}</div>
        <div class="sendMsg-content">内容</div>
        <el-input v-model="msgInput" placeholder="请输入内容" class="sendMsg-input" @change="changeMessage"></el-input>
        <el-button class="sendMsg-cancel" @click="closeMsgWindow">取消</el-button>
        <el-button type="success" @click="sendMsg" class="sendMsg-send">发送</el-button>

        <div >
          <div class="historyMsg-topic">
            历史消息
          </div>
          <div v-if="receiverInfo!=null" class="historyMsg-topic">
            {{receiverInfo.userName}}
          </div>
          <div v-if="historyMsg.length == 0"></div>
          <div v-else v-for="(item,index) in historyMsg" :key="index" class="historyMsg-each">
            <div v-if="senderId == item.senderId" >
              <img :src='senderInfo.profilePict' class="pictInDetail-right">
              <div class="historyMsg-i">
                {{item.msg}}
              </div>
            </div>
            <div v-else >
              <img :src='receiverInfo.profilePict' class="pictInDetail-left">
              <div class="historyMsg-else">
                {{item.msg}}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isShow">
      <div class="outbox" >
      </div>
      <div class="float" >

        <img :src='postToShow.profilePict' class="pictInDetail">
        <div class="nameInDetail" >{{postToShow.userName}} </div>
        <div class="schoolInDetail">本科院校：{{postToShow.school}} 目标院校：{{postToShow.targetSchool}} 总分：{{postToShow.allScore}} </div>
        <div class="titleInDetail">{{postToShow.title}} </div>
        <div class="contentNotHid">{{postToShow.contents}} </div>
        <div v-if="file!=null" class="file">
          <i v-if="file!=null" class="el-icon-document" @click="downLoadFile(file.path)"></i>
          <div v-if="file!=null" class="file-name">{{file.originalName}}</div>
        </div>

        <div class="allComments">
          全部评论( {{comments.length}} )
        </div>
        <div >
          <div v-if="comments.length !== 0">
            <div v-for="(item,index) in comments" :key="index">
              <img :src='item.profilePict' class="pictInDetail">
              <div class="nameInDetail" >{{item.userName}} </div>
              <div class="schoolInDetail">本科院校：{{item.school}} 目标院校：{{item.targetSchool}} 总分：{{item.allScore}} </div>
              <div class="comment">{{item.content}}</div>

              <hr style="opacity:0.2;margin-bottom:20px;" >
            </div>
          </div>
          <div v-else class="allCommments">
            <div>暂无评论</div>
          </div>
          <input type="text" placeholder="请输入回复内容" v-model="reply">
          <button @click="replyPost(null,postId,1,1,reply)">提交</button>
        </div>
      </div>
      <i class="fa fa-times-circle"  @click="close()"></i>
    </div>
    <el-row v-for="(item,index) in postDetail" class="post" :key="item.postId">
        <img :src="item.profilePict" class="pict" @click="isShowMessage(item.userId)">
        <div class="name">{{item.userName}} </div>
        <div class="schoolInpost">本科院校：{{item.school}} 目标院校：{{item.targetSchool}} 总分：{{item.allScore}} </div>

        <div class="title">{{item.title}} </div>
        <div class="content" @click="toPostDetail(index,item.postId)">{{item.contents}} </div>
        <i class="fa fa-thumbs-up" @click="likePost(item.postId,index)" :class="{ 'like' : currentIndexs.includes(index) } " >点赞({{item.likes}})    </i>
        <i class="fa fa-comment" >评论 </i>
        <i class="fa fa-share" >分享</i>
    </el-row>

    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>

</template>

<script>


import {getPost, likePost} from '../api/post.js'
import {getComments,sendComment} from '../api/comment.js'
import {getFileByPostId} from '../api/file'
import {getUserInfo} from '../api/user'
export default {
  data(){
      return {
        postDetail:[],
        isShow: false,
        postToShow:{},
        comments:[],
        postId:null,
        reply:null,
        currentIndexs:[],
        isSendMessage:false,
        msgInput:null,
        file:null,
        socket:null,
        senderId:null,
        receiverId:null,
        backMsg:null,
        historyMsg:[],
        receiverInfo:null,
        senderInfo:null
      }
  },
  watch: {

  },
  methods:{
    changeMessage(){
      this.$forceUpdate();
    },
    closeMsgWindow(){
      this.isSendMessage = !this.isSendMessage;
    },
      likePost(postId,index){
        likePost(postId,'1').then((response)=>{
          if (response == true){
            this.currentIndexs.push(index)
          }
        })
      },
      getPostDetail(){
          getPost().then((response)=>{
              this.postDetail = response
          })
      },
      toPostDetail(index, postId){
          this.isShow = !this.isShow;
          this.postToShow = this.postDetail[index];
          this.postId = postId;
          this.getAllComments(postId);
          this.getFileByPostId(postId)
      },
    getFileByPostId(postId){
        getFileByPostId(postId).then((response)=>{
          this.file = response;
        })
    },
      close(){
        this.isShow = !this.isShow
        console.log('当前isShow的值为：'+this.isShow)
      },
      getAllComments(postId){
        getComments(postId).then((response)=>{
          this.comments = response;
        })
      },
      replyPost(type,postId,rootId,toCommentId,content){
        const userInfo = localStorage.getItem("userInfo")
        const userId = JSON.parse(userInfo).userId
        sendComment(null,postId,rootId,toCommentId,content,userId).then(
          (response)=>{
            this.getAllComments(postId)
          }
        );
      },
    sendMsg(){
      const senderId = JSON.parse(localStorage.getItem("userInfo")).userId;
      this.socket = new WebSocket("ws://localhost:7777/websocketendpoint?senderId="+senderId);

      this.socket.addEventListener('open', (event) => {
        console.log('已连接到WebSocket服务器');
        // 发送消息
        const msg = {
          senderId:senderId,
          receiverId:this.receiverId,
          msg:this.msgInput
        }

        console.log(msg)
        this.historyMsg.push(msg)
        this.socket.send(JSON.stringify(msg));
      });

      this.socket.addEventListener('message', (event) => {
        // console.log(`收到服务器消息: ${event.data}`);
        const msg = JSON.parse(event.data)
        console.log(msg)
        // 为了演示，这里不关闭连接
        this.historyMsg.push(msg);

      });

      this.socket.addEventListener('close', (event) => {
        console.log('与服务器的连接已关闭');
      });

      this.socket.addEventListener('error', (error) => {
        console.error('发生错误:', error);
      });

      this.$message({
        message: '消息发送成功',
        type: 'success'
      });
    },
    downLoadFile(preSignedUrl){
      const filename = new URL(preSignedUrl).pathname.split('/').pop();
      const extension = filename.split('.').pop();
      fetch(preSignedUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading file:', error));
    },
    isShowMessage(receiverId){
        this.isSendMessage = !this.isSendMessage;
        this.receiverId = receiverId;
        getUserInfo(receiverId).then((response)=>{
          this.receiverInfo = response
        })
    },

  },
  components:{

  },
  created(){
    this.getPostDetail();
    const userInfo = localStorage.getItem("userInfo")
    this.senderInfo = JSON.parse(userInfo)
    this.senderId = JSON.parse(userInfo).userId
  },
  mounted() {
      this.getPostDetail()
  }
}
</script>

<style>
.file:hover{
  color: skyblue;
  cursor: pointer;
}
.fa-times-circle{
  position: absolute;
  top: 0;
  left: 76%;
  font-size: 20px;
  color: black;
}
.el-icon-document:hover{
  color: skyblue;
}
.el-icon-document{
  font-size: 20px;
}
.file-name:hover{
  color: skyblue;
}
.like{
  color: red;
}
.fa-times-circle{
    z-index: 1000;
    font-size: 20px;
    cursor: pointer;
    position: fixed;

}
.fa-thumbs-up:hover{
    /* height: 30px; */
    /* width: 50px; */
    top: 20px;
    cursor: pointer;
    size: 10px;
    color: skyblue;
}
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
.floatMsg{
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

.schoolInpost{
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
    left: 10px;
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

.sendMsg-title {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  height: 25px;
  left: 10px;
  top:10px
}

.sendMsg-to {
  position: absolute;
  top: 50px;
  left: 10px;
}

.sendMsg-content {
  position: absolute;
  top: 80px;
  left: 10px;
}

.sendMsg-cancel {
  position: absolute;
  bottom: 10px;
  right: 100px;
}

.sendMsg-send {
  position: absolute;
  bottom: 10px;
  right: 30px;
}

.sendMsg-input {
  position: absolute;
  top: 80px;
  left: 50px;
  width: 300px;
  height: 150px;
}

.sendMsg-name {
  position: absolute;
  top: 50px;
  left: 50px;
}

.historyMsg-i {
  top: 140px;
  position: absolute;
  right: 60px;
}
.historyMsg-else{
  left: 60px;
  top: 140px;
  position: absolute;
}

.historyMsg-topic {
  position: relative;
  top: 120px;
  font-size: 16px;
  height: 30px;
  background-color: darkgrey;
}

.historyMsg-each {
  position: relative;
  height: 50px;
}

.pictInDetail-left {
  top: 130px;
  width: 40px;
  display: inline;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 1px deepskyblue;
  position: absolute;
  left: 10px;
}
.pictInDetail-right {
  top: 130px;
  width: 40px;
  display: inline;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 1px deepskyblue;
  position: absolute;
  right: 10px;
}
</style>
