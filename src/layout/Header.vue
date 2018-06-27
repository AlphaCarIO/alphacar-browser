<template>
<div class="lc_h">
<el-row>
  <el-col :span="2">
    <div @click="onHome" class="logo_div" style="margin-left: 50px; margin-top: 20px">
      <img height="80px" src="@/assets/logo.png" />
    </div>
  </el-col>
  <el-col :span="17">
    <div style="margin-left: 250px; margin-top: 35px;">
  <el-input :placeholder="input_holder" v-model="search_txt" @keyup.enter.native="onSearch" class="input-with-select">
    <el-select v-model="search_type" slot="prepend" placeholder="Select">
      <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    <el-button slot="append" @click="onSearch()" icon="el-icon-search"></el-button>
  </el-input>
    </div>
  </el-col>
  <el-col :span="2">
    <div style="margin-left: 50px; margin-top: 35px;">
    <el-select class="nation_s" v-model="nation" slot="prepend" @change="onChange" placeholder="Select">
      <el-option v-for="item in nations" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    </div>
  </el-col>
</el-row>

</div>
</template>

<style>

.el-select .el-input {
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #dcdfe6;
}
</style>

<style scoped>
.nation_s {
  width: 60px !important;
}

.logo_div {
  cursor: pointer;
}

.lc_h {
  text-align: left;
  font-size: 30px;
  color: #ffffff;
  height: 100%;
  position: relative;
}
</style>

<script>
import bus from "@/utils/event";
import * as cc from "@/config/constants"

export default {
  name: "Header",
  computed: {
    input_holder: function() {
      return this.$t("message.PlzInput")
    },
    options: function() {
      return [
        {
          value: "0",
          label: this.$t("message.search_type_all")
        },
        {
          value: "1",
          label: this.$t("message.search_type_vincode")
        },
        {
          value: "2",
          label: this.$t("message.search_type_username")
        }
      ]
    }
  },
  data() {
    return {
      nations: [
        {
          value: "cn",
          label: "zh-CN"
        },
        {
          value: "en",
          label: "en-US"
        },
      ],
      search_txt: "",
      search_type: "0",
      nation: "cn"
    };
  },
  mounted() {
    //console.log('header fetchData this.$route.path=', this.$route.path);

    if (this.$route.path == "/search") {
      let search_type = this.$route.query.search_type.trim();
      let search_txt = this.$route.query.search_txt.trim();
      this.search_type = search_type;
      this.search_txt = search_txt;
    }

    this.nation = this.$i18n.locale;

  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    onChange() {
      console.log('nation:', this.nation);
      this.$i18n.locale = this.nation;
    },

    onKeyPress: function(ev) {
      console.log("ev.keyCode=", ev.keyCode);
      if (ev.keyCode == 13) {
        this.onSearch();
      }
    },

    fetchData() {
      if (this.$route.path != "/search") {
        this.search_type = "0";
        this.search_txt = "";
      }
    },

    onHome() {
      this.$router.push({ path: "/" });
    },

    onSearch() {
      let search_txt = this.search_txt.trim();
      let query_cond = { search_type: this.search_type, search_txt: search_txt }
      //this.$router.go(this.$router.currentRoute)
      this.$router.push({
        path: "/search",
        query: query_cond
      });

      bus.$emit(cc.DO_SEARCH, query_cond);
      
    }
  }
};
</script>