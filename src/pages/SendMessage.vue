<template>
    <div>
        <ky-header></ky-header>
        <ky-sendMessage></ky-sendMessage>

    </div>
</template>

<script>
import header from '../components/header.vue'
import sendMessage from '../components/sendMessage.vue'
export default {
    name:"PostSend",
    components:{
        'ky-header':header,
        "ky-sendMessage":sendMessage
    }
}
</script>

<style>

</style>
