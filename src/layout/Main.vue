<template>
  <el-container class="main_panel">
  <el-header class="header"><Header/></el-header>
  <el-main class="my_main"><router-view/></el-main>
  <el-footer class="footer"><Footer/></el-footer>
</el-container>
</template>

<script>
import bus from "@/utils/event"
import * as cc from "@/config/constants"

import Header from "@/layout/Header.vue"
import Footer from "@/layout/Footer.vue"

export default {
  name: 'Main',
  components: {
    Header,
    Footer,
  },
  data () {
    return {
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-header {
  height: 120px !important;
}

.header {
  background-color:#ffffff;
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}

.main_panel {
  background: url("../assets/bg.jpg") no-repeat center;
  /*background-size: 100% 100%;
  -moz-background-size: 100% 100%;*/
  background-size: cover;   
  -webkit-background-size: cover;   
  -moz-background-size: cover;   
  -o-background-size: cover;
  opacity: 0.7;
  filter: alpha(opacity=70);
  border: 1px solid black;
}

.my_main {
  margin-top: 0px;
  height: 640px !important;
  padding: 0% !important;
}

.footer {
  padding: 0px;
  height: 40px !important;
}
h1, h2 {
  font-weight: normal;
}
</style>
