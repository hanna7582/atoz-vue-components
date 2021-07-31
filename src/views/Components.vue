<template>
  <section class="views">
    <h1>
      Components
      <template v-if="subName">
        <span v-for="item in componentsName" :key="item"> / {{ item }}</span>
      </template>
    </h1>
    <router-view />
  </section>
</template>

<script>
export default {
  name: 'Components',
  computed: {
    subName() {
      return this.$route.matched.length !== 1
    },
    componentsName() {
      return this.$route.matched.length !== 1 ? this.$route.matched.map(item => item.name).splice(1) : ['']
    }
  }
}
</script>

<style></style>
