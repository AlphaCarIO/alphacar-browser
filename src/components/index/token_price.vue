<template>
<div v-if="loading" class="display-3 text-lg-center">{{ $t("message.loading") }}</div>
<div v-else v-bind:class="['display-1 text-lg-left', price_color]">
  <v-layout row wrap class="font-weight-black font-italic black--text">
    ETH/USDT
  </v-layout>
  <v-divider/>
  <v-layout row wrap align-baseline>
    <v-flex>
      {{ $t("message.quote_last") }}:&nbsp;{{ eth_price }}
    </v-flex>
    <v-flex class='caption'>
      {{ $t("message.quote_percentChange") }}:&nbsp;{{ percentChange }}%
    </v-flex>
  </v-layout>
  <v-divider/>
  <v-layout row wrap class='subheading'>
    {{ $t("message.quote_baseVolume") }}:&nbsp;{{ baseVolume }}
  </v-layout>
  <v-divider/>
  <v-layout row wrap class='subheading'>
    <v-flex :class='high_color'>
    {{ $t("message.quote_high24hr") }}:&nbsp;{{ high24hr }}
    </v-flex>
    <v-flex :class='low_color'>
      {{ $t("message.quote_low24hr") }}:&nbsp;{{ low24hr }}
    </v-flex>
  </v-layout>
</div>
</template>

<style scoped>

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
    high_color: function() {
      let color = "red--text";
      
      if (this.$i18n.locale == "en") {
        color = "green--text";
      }
      
      return color;
    },
    low_color: function() {
      let color = "green--text";
      
      if (this.$i18n.locale == "en") {
        color = "red--text";
      }
      
      return color;
    },
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