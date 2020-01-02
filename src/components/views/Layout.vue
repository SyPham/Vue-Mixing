<template>
  <!-- <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <el-aside style="width:240px;">
        <navegationmenu></navegationmenu>
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="24">
              <router-view></router-view>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container> -->
  <div class="wrapper">
    <app-header></app-header>
    <side-bar></side-bar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navegationmenu from "../shared/NavegationMenu";
import AppHeader from "../shared/Header";
import SideBar from "../shared/Slidebar";
export default {
  components: {
    navegationmenu,
    AppHeader: AppHeader,
    SideBar: SideBar,
    props: {
      source: String
    }
  },
  created: function() {
    
  },

  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>