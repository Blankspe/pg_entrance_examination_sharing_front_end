<!-- 首页 -->
<template>

    <div>


        <ky-header></ky-header>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <ky-post></ky-post>
                    <sg-articlelist></sg-articlelist>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <ky-rightlist></ky-rightlist>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import articlelist from '../components/articlelist.vue'
import rightlist from '../components/rightlist.vue'
import postDeatil from '../components/postDetail.vue'
    export default {
        name:'Home',
        data() { //选项 / 数据
            return {

            }
        },
        methods: { //事件处理器

        },
        components: { //定义组件
            'ky-header':header,
            'sg-articlelist':articlelist,
            'ky-rightlist':rightlist,
            'ky-post':postDeatil
        },
        created() { //生命周期函数

        }
    }
</script>

<style>

</style>
