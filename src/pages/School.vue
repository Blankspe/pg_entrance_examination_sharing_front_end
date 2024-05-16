<template>
    <div>
        <ky-header></ky-header>

        <ky-school></ky-school>
    </div>
</template>

<script>
import header from '../components/header.vue'
import school from '../components/school.vue'
export default {
    name:"School",
    components:{
        'ky-header':header,
        "ky-school":school
    }
}
</script>

<style>

</style>