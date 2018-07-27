<template>
<v-container>
<div v-if="show_cond == 0" class="display-1 text-lg-center">
  {{ $t("message.loading") }}
</div>
<div v-else-if="show_cond == 1" class="display-1 text-lg-center">
{{ $t("message.no_ubi_info") }}
</div>
<div v-else-if="show_cond == 2" class="body-1">
  <v-layout row wrap class='headline text-lg-center'>
    <v-flex>
      {{ $t("message.ubi_info") }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'> 
      {{ $t("message.tbl_ubi_code") }} :{{ ubi_code }}
    </v-flex>
    <v-flex class='ml-5'> 
      {{ $t("message.tbl_duration") }}:{{ start_date }}&nbsp;---&nbsp;{{ end_date }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
      {{ $t("message.tbl_vincode") }}:{{ vincode }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
    {{ $t("message.tbl_name") }} :{{ name }}
    </v-flex>
    <v-flex class='ml-5'>
    {{ $t("message.tbl_driving_license") }}:{{ driving_license }}
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-layout row wrap>
    <v-flex class='ml-5'>
  {{ $t("message.tbl_hash") }}:
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex class='ml-5'>
    <v-layout row v-if="hash=='' || hash==undefined">
      {{ $t("message.empty_hash") }}
    </v-layout>
    <v-container class='d-inline-block' v-else>
      <v-layout row>
        <a :href="ipfs_addr + '/ipfs/' + hash">{{ ipfs_addr }}/ipfs/{{ hash }}</a>
      </v-layout>
      <v-layout row wrap>
        <a :href="'https://gateway.ipfs.guide/' + hash">https://gateway.ipfs.guide/{{ hash }}</a>
      </v-layout>
      <v-layout row wrap>
        <a :href="'http://ipfs.io/ipfs/' + hash">http://ipfs.io/ipfs/{{ hash }}</a>
      </v-layout>
    </v-container>
    </v-flex>
  </v-layout>
  <v-layout class="mt-5">
    <v-spacer></v-spacer>
    <v-btn dark @click="onBack">{{ $t("message.Back") }}</v-btn>
    <v-spacer></v-spacer>
  </v-layout>
</div>
</v-container>
</template>

<style scoped>
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
      ipfs_addr: app_config.ipfs_server_addr,
      ubi_code: "",
      name: "",
      driving_license: "",
      vincode: "",
      start_date: "",
      end_date: "",
      hash: "",
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
      let ubi_code = self.$route.params.ubi_code;

      self.$http.get("/api/ubi_info/index/" + ubi_code).then(
        response => {
          if (response.status == 200) {
            if (response.data.error_code == 0) {
              self.ubi_code = response.data.data.ubi_code;
              self.name = response.data.data.user.name;
              self.driving_license = response.data.data.user.driving_license;
              self.vincode = response.data.data.car_info.vin_code;
              self.start_date = response.data.data.start_date;
              self.end_date = response.data.data.end_date;
              self.hash = response.data.data.hash;
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