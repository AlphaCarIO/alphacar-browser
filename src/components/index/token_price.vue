<template>
<div v-if="loading" class="loading">{{ $t("message.loading") }}</div>
<div v-else v-bind:class="['content', price_color]">
ETH_USDT {{ $t("message.quote_last") }}:{{ eth_price }}
<div class='small_content'>
  {{ $t("message.quote_percentChange") }} :{{ percentChange }}%
</div>
<div class='small_content2'>
  {{ $t("message.quote_baseVolume") }}:{{ baseVolume }}
</div>
<div class='small_content2'>
  {{ $t("message.quote_high24hr") }}:{{ high24hr }}&nbsp;&nbsp;&nbsp;{{ $t("message.quote_low24hr") }}:{{ low24hr }}
</div>
</div>
</template>

<style scoped>
.loading {
  padding-top: 0px;
  font-size: 50px;
  width: 100%;
  height: 250px;
  line-height: 250px;
  text-align: center;
}

.content {
  padding-top: 30px;
  font-size: 30px;
  width: 100%;
  height: 250px;
  text-align: left;
}

.small_content {
  font-size: 18px;
}

.small_content2 {
  color: #000000;
  font-size: 18px;
}

.whiteColor {
  color: #ffffff;
}

.redColor {
  color: #ff0000;
}

.greenColor {
  color: #028302;
}
</style>
<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants";
import qs from "qs";

export default {
  components: {},
  computed: {
    price_color: function() {
      let color = "whiteColor";

      if (this.isUp == 1) {
        if (this.$i18n.locale == "cn") {
          color = "redColor";
        } else {
          color = "greenColor";
        }
      } else if (this.isUp == -1) {
        if (this.$i18n.locale == "cn") {
          color = "greenColor";
        } else {
          color = "redColor";
        }
      }
      return color;
    },
    tbl_ubi_code: function() {
      return this.$t("message.tbl_ubi_code");
    },
    tbl_name: function() {
      return this.$t("message.tbl_name");
    },
    tbl_driving_license: function() {
      return this.$t("message.tbl_driving_license");
    },
    tbl_vincode: function() {
      return this.$t("message.tbl_vincode");
    },
    tbl_duration: function() {
      return this.$t("message.tbl_duration");
    },
    tbl_hash: function() {
      return this.$t("message.tbl_hash");
    }
  },
  data() {
    return {
      isUp: 0,
      eth_price: "",
      percentChange: "",
      percentChange2: "",
      baseVolume: "",
      high24hr: "",
      low24hr: "",
      loading: true
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      let self = this;

      //https://data.gateio.io/api2/1/ticker/eth_usdt
      self.$http.get("/api/gateio/ticker/eth_usdt").then(
        response => {
          if (response.status == 200) {
            self.eth_price = response.data.data.last;
            self.baseVolume = response.data.data.baseVolume.toFixed(4);
            self.high24hr = response.data.data.high24hr;
            self.low24hr = response.data.data.low24hr;
            self.percentChange = response.data.data.percentChange.toFixed(2);
            if (self.percentChange == 0) {
              self.isUp = 0;
            } else if (self.percentChange > 0) {
              self.isUp = 1;
            } else {
              self.isUp = -1;
            }
            self.loading = false;
          }
        },
        response => {
          console.log(response);
        }
      );
    }
  }
};
</script>