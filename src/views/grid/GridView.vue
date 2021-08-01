<template>
  <div>
    <template v-if="routeName === 'grid'">
      <ul class="depth3">
        <li v-for="depth3 in categoryList" :key="depth3.name">
          <router-link :to="'/templates/grid/' + depth3.name">
            {{ depth3.name }}
          </router-link>
        </li>
      </ul>
      <Grid class="md" v-highlight />
    </template>
    <router-view />
  </div>
</template>

<script>
import Grid from '@/md/grid/Grid.md'
export default {
  components: {
    Grid
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    categoryList() {
      let arr = console.log(arr)
      return this.$categoryList
        .filter(depth1 => {
          return depth1.name == 'templates'
        })[0]
        .depth2.filter(depth2 => {
          return depth2.name == 'grid'
        })[0].depth3
    }
  }
}
</script>

<style></style>
