<template>
<v-app>

  <Header/>  
  <!--v-parallax height="100%" :src="require('@/assets/bg.jpg')">
  </v-parallax-->
  <Main/>
  <Footer/>
</v-app>
</template>

<script>

import Header from "@/layout/Header.vue"
import Main from "@/layout/Main.vue"
import Footer from "@/layout/Footer.vue"

export default {
  components: {
    Header,
    Main,
    Footer,
  },
  name: "app"
};
</script>

<style lang="scss">
//@import "../static/styles/custom-bootstrap.scss";
//@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
