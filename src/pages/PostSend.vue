<template>
    <div>
        <ky-header></ky-header>
        <ky-postSend></ky-postSend>

    </div>
</template>

<script>
import header from '../components/header.vue'
import postSend from '../components/postSend.vue'
export default {
    name:"PostSend",
    components:{
        'ky-header':header,
        "ky-postSend":postSend
    }
}
</script>

<style>

</style>
