<template>
  <div class="bigbox">

    <div v-for="item in schoolDetail" :key="item.schoolId" class="school">
        <div>
            <div>{{item.schoolName}}</div>
        </div>
        
    </div>
  </div>

</template>

<script>
import {getSchools} from '../api/school.js'
export default {
    data(){
        return {
            schoolDetail:[]
        }
    },
    methods:{
        getSchoolsDetail(){
            getSchools().then((response)=>{
                this.schoolDetail = response
            })
        }
    },
    components:{

    },
    created(){
        this.getSchoolsDetail()
    }
}
</script>

<style>
.school{
    background: white;
    margin-bottom: 50px;
    margin-left: 50px;
    width: 800px;
    height: 100px;
}
.bigbox{
    background: rgb(239, 239, 239);
}
</style>