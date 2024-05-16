<template>
  <div class="post-form-container">
    <h1>发表新帖</h1>

    <div class="form-group">
      <label for="title">标题</label>
      <input type="text" id="title" v-model="title" placeholder="请输入帖子标题" required>
    </div>

    <div>
        <el-radio v-model="radio" label="1" @click="chooseType('1')">初试经验</el-radio>
        <el-radio v-model="radio" label="2" @click="chooseType('2')">复试经验</el-radio>
    </div>

    <div class="form-group">
      <label for="file">附件</label>
      <input type="file" id="file" @change="onFileChange">
      <span v-if="selectedFile">{{ selectedFile.name }}</span>
    </div>

    <div style="height: 425px; overflow: auto">
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
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
      radio: '1'
    }
  },
  methods: {
    // onFileChange(e) {
    //   this.selectedFile = e.target.files[0];
    // },
    submitPost() {
      // 实现提交帖子的逻辑，包括调用API发送数据
      console.log('提交帖子', this.title, this.content, this.selectedFile);
      // 注意：实际应用中需要处理文件上传逻辑
    },
    chooseType: function(type){
      this.radio = type;
    },
    handleChange(value) {
      console.log('选中的值为:', value);
      // 在这里处理变化后的逻辑
    }

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
