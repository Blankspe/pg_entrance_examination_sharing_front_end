<template>
  <div>
    <ky-header></ky-header>
    <ky-search></ky-search>
  </div>
</template>

<script>
import header from '../components/header.vue'
import search from '../components/search.vue'
export default {
    name:"Search",
    components:{
        'ky-header':header,
        "ky-search":search
    }
}

</script>

<style>

</style>