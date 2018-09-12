<template>
<v-container>
<div v-if="show_cond == 0" class="display-1 text-lg-center">
  {{ $t("message.loading") }}
</div>
<div v-else-if="show_cond == 1" class="display-1 text-lg-center">
{{ $t("message.no_ubi_info") }}
</div>
<div v-else-if="show_cond == 2" class="body-1">
  <v-layout row wrap class='headline'>
    <v-spacer></v-spacer>
    <v-flex class="text-lg-center">
      {{ $t("message.token_info") }}
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
      {{ $t("message.symbol") }}:&nbsp;{{ symbol }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
    {{ $t("message.name") }}:&nbsp;{{ name }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
    {{ $t("message.decimals") }}:&nbsp;{{ decimals }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
  {{ $t("message.totalSupply") }}:&nbsp;{{ totalSupply }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
  {{ $t("message.owner") }}:&nbsp;{{ owner }}
    </v-flex>
  </v-layout>
</div>
</v-container>
</template>

<style scoped>
</style>

<script>
import bus from "@/utils/event";
import qs from "qs";
import * as app_config from "@/config/app_config";
import {BigNumber} from 'bignumber.js';

export default {
  components: {},
  computed: {},

  data() {
    return {
      symbol: "",
      name: "",
      decimals: "",
      totalSupply: "",
      owner: "",
      show_cond: 0
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      let self = this;
      self.$http.get("/api/token/info").then(
        response => {
          if (response.status == 200) {
            if (response.data.error_code == 0) {
              self.symbol = response.data.data.symbol;
              self.name = response.data.data.name;
              self.decimals = response.data.data.decimals;
              self.totalSupply = new BigNumber(response.data.data.totalSupply / (10 ** self.decimals)).toFormat(0);
              self.owner = response.data.data.owner;
              self.show_cond = 2
            } else {
              self.show_cond = 1
            }
          }
        },
        response => {
          console.log(response);
        }
      );
    },

    onBack() {
      let self = this;
      self.$router.go(-1);
      //self.$router.push({ path: "/" });
    }
  }
};
</script>