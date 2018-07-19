<template>
<div class="detail_page page_font">
<div v-if="show_cond == 0" class="loading">
  {{ $t("message.loading") }}
</div>
<div v-else-if="show_cond == 1" class="loading">
{{ $t("message.no_ubi_info") }}
</div>
<div v-else-if="show_cond == 2" class="content">
<div style="text-align: center">
  {{ $t("message.ubi_info") }} 
</div>
<div style="text-align:center">
  -----------------------------------------------
</div>
<div class='small_content'>
  {{ $t("message.tbl_ubi_code") }} :{{ ubi_code }}
</div>
<div class='small_content'>
  {{ $t("message.tbl_name") }} :{{ name }}
</div>
<div class='small_content'>
  {{ $t("message.tbl_driving_license") }}:{{ driving_license }}
</div>
<div class='small_content'>
  {{ $t("message.tbl_vincode") }}:{{ vincode }}
</div>
<div class='small_content'>
  {{ $t("message.tbl_duration") }}:{{ start_date }}&nbsp;---&nbsp;{{ end_date }}
</div>
<div class='small_content'>
  {{ $t("message.tbl_hash") }}:
</div>
<div class='small_content'>
        <div v-if="hash=='' || hash==undefined">
          {{ $t("message.empty_hash") }}
        </div>
        <div v-else>
          <div>
          <a :href="ipfs_addr + '/ipfs/' + hash">{{ ipfs_addr }}/ipfs/{{ hash }}
          </a>
        </div>
        <div>
          <a :href="'https://gateway.ipfs.guide/' + hash">https://gateway.ipfs.guide/{{ hash }}
          </a>
        </div>
        <div>
          <a :href="'http://ipfs.io/ipfs/' + hash">http://ipfs.io/ipfs/{{ hash }}
          </a>
        </div>
        </div>
</div>
</div>
  <div style="text-align:center; margin-top:5px;">
    <b-button class="bk_btn" @click="onBack" plain>{{ $t("message.Back") }}</b-button>
  </div>
</div>
</template>

<style scoped>
.detail_page {
  background: #d3dce6;
  border-radius: 30px;
  height: 520px;
  text-align: center;
  opacity: 0.7 !important;
  filter: alpha(opacity=70) !important;
}

.page_font {
  color: #181616;
}

.loading {
  padding-top: 0px;
  font-size: 50px;
  width: 100%;
  height: 520px;
  line-height: 520px;
  text-align: center;
}

.content {
  padding-top: 30px;
  font-size: 30px;
  width: 100%;
  height: 450px;
  text-align: left;
}

.small_content {
  color: #423b3b;
  font-size: 18px;
}

.bk_btn {
  margin: auto;
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

      //https://data.gateio.io/api2/1/ticker/eth_usdt
      self.$http.get("/ubi_info/index/" + ubi_code).then(
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