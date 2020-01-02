<template>
  <transition name="scale">
    <router-view></router-view>
  </transition>
</template>

<script>
// import navegationmenu from "@/components/shared/NavegationMenu";
// import AppHeader from "./components/shared/Header";
export default {
  // components: {
  //   navegationmenu
  // },
  // props: {
  //   source: String
  // }
  name: "dashboard",
  // components: {
  //   AppHeader: AppHeader
  // },
  // created: function() {}
};
</script>