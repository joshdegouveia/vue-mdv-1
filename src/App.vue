<template>
  <el-container>
    <el-header>
      <el-menu :router="true" :default-active="$route.path" mode="horizontal">
        <template v-for="rule in $router.options.routes" :key="rule.name">
          <el-submenu v-if="rule.children && rule.children.length > 0"
                      :index="rule.path"
          >
            <template><i :class="rule.icon"></i>{{ rule.name }}</template>
            <el-menu-item v-for="child in rule.children"
                          :key="child.name"
                          :index="rule.path + '/' + child.path">
              {{ child.name }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else
                        :index="rule.path"
          >
            <i :class="rule.icon"></i>
            {{ rule.name }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  padding: 0 !important;
}
</style>
