<template>
  <div>
    <b-modal title="发私信" @ok="sendMessage">
      <form>
        <b-form-group label="内容">
          <b-input-group>
            <b-input-group-prepend is-text>表情</b-input-group-prepend>
            <b-input-group-append is-text>图片</b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-button type="submit" variant="primary">发送</b-button>
        <b-button variant="secondary" @click="$emit('cancel')">取消</b-button>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Vue from 'vue';

// Import Bootstrap and BootstrapVue CSS.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
export default {
  data(){
    return{

    }
  },
  methods:{
    sendMessage(){

    }
  }
}
</script>

<style scoped>
.b-input-group > .b-form-group {
  display: flex;
}

.b-input-group > .b-form-group > .b-form-group__content {
  width: calc(100% - 2rem);
}
</style>
