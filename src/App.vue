<template>
  <div id="app" class="container-fluid">
    <Header/>
	<router-view></router-view>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/layout/Header.vue"
import Footer from "@/layout/Footer.vue"

export default {
  components: {
    Header,
    Footer,
  },
  name: "app"
};
</script>

<style lang="scss">
//@import "../static/styles/custom-bootstrap.scss";
//@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
