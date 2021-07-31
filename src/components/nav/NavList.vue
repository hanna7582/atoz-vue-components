<template>
  <div class="side-nav-list">
    <ul class="depth1">
      <li v-for="(item, index) in $categoryList" :key="index">
        <router-link :to="'/' + item.name">{{ item.name }}<i class="fas fa-angle-down"></i></router-link>
        <ul class="depth2" v-if="item.depth2.length">
          <li v-for="depth2 in item.depth2" :key="depth2.name">
            <router-link :to="'/' + item.name + '/' + depth2.name">
              {{ depth2.name }}
            </router-link>
            <ul class="depth3" v-if="depth2.depth3.length">
              <li v-for="depth3 in depth2.depth3" :key="depth3.name">
                <router-link :to="'/' + item.name + '/' + depth2.name + '/' + depth3.name">
                  {{ depth3.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
