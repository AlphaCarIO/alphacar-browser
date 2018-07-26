<template>
<v-app>

  <Header/>  
  <!--v-parallax height="100%" :src="require('@/assets/bg.jpg')">
  </v-parallax-->
  <Main/>
  <Footer/>

</v-app>
</template>

<style>

.content {
  padding-top: 30px;
  font-size: 24px;
  width: 100%;
  color: #423b3b;
}

.big_font {
  font-size: 24px;
}

.small_font {
  font-size: 14px;
}

.bk_btn {
  margin: auto;
}

</style>

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
