<template>
  <nav class="side-nav">
    <Search />
    <NavList />
  </nav>
</template>

<script>
import Search from '@/components/nav/Search.vue'
import NavList from '@/components/nav/NavList.vue'
export default {
  components: {
    Search,
    NavList
  }
}
</script>

<style></style>
