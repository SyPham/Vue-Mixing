<template>
<el-menu default-active="0">
    <template v-for="item, i in items">
        <el-submenu :index="i.toString()" v-if="item.children !== undefined">
            <template slot="title">
                <i :class="'fa fa-' + item.icon"></i>
                <span>{{ item.text }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="child, c in item.children" :index="(i.toString() + c)" @click="redirect(child.path)">
                    <i :class="'fa fa-' + child.icon"></i> <span>{{ child.text }}</span>
                </el-menu-item>
            </el-menu-item-group>    
        </el-submenu>
        <el-menu-item index="2" v-if="item.children === undefined" @click="redirect(item.path)">
            <i :class="'fa fa-' + item.icon"></i>
            <span>{{ item.text }}</span>
        </el-menu-item>
    </template>
</el-menu>
</template>

<script>
export default {
  name: "NavegationMenu",
  data: () => ({
    items: [
      { icon: "dashboard", text: "Dashboard", path: "/" },
      {
        icon: "user",
        text: "User",
        children: [
          { icon: "plus", text: "add User", path: "/students/add" },
          { icon: "list", text: "Lis User", path: "/students" },
          ]
      },
      {
        icon: "wrench",
        text: "Machine",
        children: [
          { icon: "list", text: "List machine", path: "/machines" },
          // { icon: "list", text: "Opción 2", path: "/configuration/opcion2" }
        ]
      }
    ]
  }),
  methods: {
    redirect(path) {
      if(path === undefined) return;
      this.$router.push(path);
    }
  }
};
</script>