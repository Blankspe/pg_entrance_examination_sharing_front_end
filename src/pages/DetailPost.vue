<template>
  <div>
    <ky-header></ky-header>
    <ky-postdetail></ky-postdetail>
  </div>
</template>

<script>
import header from '../components/header.vue'
import postDetail from '../components/postDetail.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        "ky-header":header,
        "ky-postdetail":postDetail
    }
}
</script>

<style>

</style>