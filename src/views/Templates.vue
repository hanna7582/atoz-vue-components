<template>
  <section class="views">
    <h1>
      Templates
      <template v-if="subName">
        <span v-for="item in componentsName" :key="item"> / {{ item }}</span>
      </template>
    </h1>
    <template v-if="routeName === 'templates'">
      <ul class="depth2" v-if="$categoryList[1].depth2.length">
        <li v-for="depth2 in $categoryList[1].depth2" :key="depth2.name">
          <router-link :to="'/templates/' + depth2.name">
            {{ depth2.name }}
          </router-link>
          <ul class="depth3" v-if="depth2.depth3.length">
            <li v-for="depth3 in depth2.depth3" :key="depth3.name">
              <router-link :to="'/templates/' + depth2.name + '/' + depth3.name">
                {{ depth3.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </template>
    <router-view />
  </section>
</template>

<script>
export default {
  name: 'Templates',
  computed: {
    routeName() {
      return this.$route.name
    },
    subName() {
      return this.$route.matched.length !== 1
    },
    componentsName() {
      return this.$route.matched.length !== 1 ? this.$route.matched.map(item => item.name).splice(1) : ['']
    }
  }
}
</script>

<style lang="scss"></style>
