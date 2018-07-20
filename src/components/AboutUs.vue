<template>
<v-container>
  <v-layout row wrap class='big_font'>
    <v-spacer></v-spacer>
    <v-flex class="text-lg-center">
      {{ $t("message.menu_about_us") }}
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'> 
      {{ $t('message.about_us_msg') }}
    </v-flex>
  </v-layout>
</v-container>
</template>

<style scoped>

.big_font {
  font-size: 30px;
}

</style>
<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import qs from "qs";
import * as app_config from "@/config/app_config";

export default {
  components: {},
  computed: {},

  data() {
    return {
    }
  },
  created() {
  },
  mounted() {},
  methods: {
  }
};
</script>