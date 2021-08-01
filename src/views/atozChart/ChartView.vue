<template>
  <div>
    <template v-if="routeName === 'atozChart'">
      <ul class="depth3">
        <li v-for="depth3 in categoryList" :key="depth3.name">
          <router-link :to="'/components/atozChart/' + depth3.name">
            {{ depth3.name }}
          </router-link>
        </li>
      </ul>
    </template>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name
    },
    categoryList() {
      let arr = console.log(arr)
      return this.$categoryList
        .filter(depth1 => {
          return depth1.name == 'components'
        })[0]
        .depth2.filter(depth2 => {
          return depth2.name == 'atozChart'
        })[0].depth3
    }
  }
}
</script>

<style></style>
