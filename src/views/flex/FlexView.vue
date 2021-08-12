<template>
  <div>
    <template v-if="routeName === 'flex'">
      <ul class="depth3">
        <li v-for="depth3 in categoryList" :key="depth3.name">
          <router-link :to="'/templates/flex/' + depth3.name">
            {{ depth3.name }}
          </router-link>
        </li>
      </ul>
      <Flex class="md" v-highlight />
    </template>
    <router-view />
  </div>
</template>

<script>
import Flex from '@/md/flex/Flex.md'
export default {
  components: {
    Flex
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    categoryList() {
      return this.$categoryList
        .filter(depth1 => {
          return depth1.name == 'templates'
        })[0]
        .depth2.filter(depth2 => {
          return depth2.name == 'flex'
        })[0].depth3
    }
  }
}
</script>

<style></style>
