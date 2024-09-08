<template>
  <div class="post-form-container">
    <h1>发表新帖</h1>

    <div class="form-group">
      <label for="title">标题</label>
      <input type="text" id="title" v-model="title" placeholder="请输入帖子标题" required>
    </div>

    <div>
        <el-radio v-model="radio" label="1">初试经验</el-radio>
        <el-radio v-model="radio" label="2">复试经验</el-radio>
    </div>

    <el-upload
      ref="upload"
      class="upload-demo"
      :headers="postIdInfo"
      action="http://localhost:7777/fileUpLoad"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">文件不能超过50Mb</div>
    </el-upload>

    <div style="height: 425px; overflow: auto">
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOptions"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        style="height: 400px"
      />
    </div>

    <button @click="submitPost" class="submit-btn">发布</button>

  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import {submitPost} from "../api/post";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      title: '',
      content: '',
      editorOptions: { theme: 'snow' }, // Quill.js配置
      selectedFile: null,
      radio: '1',
      fileList:[],
      postIdInfo:{postId:''}
    }
  },
  methods: {
    // onFileChange(e) {
    //   this.selectedFile = e.target.files[0];
    // },
    submitPost() {
      // 注意：实际应用中需要处理文件上传逻辑
      const userInfo = JSON.parse( localStorage.getItem('userInfo'));
      const userId = userInfo.userId

      submitPost(this.title,userId,this.radio, null,this.content).then((response)=>{
        const postId = response;
        console.log(postId)
        this.postIdInfo.postId = postId
        console.log('发送帖子成功');
        this.$refs.upload.submit();
      });



    },
    handleChange(value) {
      console.log('选中的值为:', value);
      // 在这里处理变化后的逻辑


    },
    onEditorBlur(){

    },
    onEditorFocus(){

    },
    onEditorChange(){

    },
    onFileChange(){

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
  }
}
</script>

<style scoped>
.post-form-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
