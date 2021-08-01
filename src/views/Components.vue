<template>
  <section class="views">
    <h1>
      Components
      <template v-if="subName">
        <span v-for="item in componentsName" :key="item"> / {{ item }}</span>
      </template>
    </h1>
    <template v-if="routeName === 'components'">
      <ul class="depth2" v-if="$categoryList[0].depth2.length">
        <li v-for="depth2 in $categoryList[0].depth2" :key="depth2.name">
          <router-link :to="'/components/' + depth2.name">
            {{ depth2.name }}
          </router-link>
          <ul class="depth3" v-if="depth2.depth3.length">
            <li v-for="depth3 in depth2.depth3" :key="depth3.name">
              <router-link :to="'/components/' + depth2.name + '/' + depth3.name">
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
  name: 'Components',
  computed: {
    routeName(){
      return this.$route.name
    },
    subName() {
      return this.$route.matched.length !== 1
    },
    componentsName() {
      return this.$route.matched.length !== 1 ? this.$route.matched.map(item => item.name).splice(1) : ['']
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/_base/_variables.scss';
.views {
  a:hover {
    color: $primary;
  }
  .depth2 {
    > li {
      margin-bottom: 10px;
    }
  }
  .depth3 {
    margin-left: 1em;
    font-size: 0.9em;
    li {
      line-height: 2;
    }
    li::before {
      content: '-';
    }
  }
}