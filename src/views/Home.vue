<template>
  <section class="views">
    <h2>DashBoard</h2>
    <p>vue에서 사용하는 컴포넌트와 다양한 레이아웃을 제공합니다.(업데이트 중)</p>
    <div class="depth1" v-for="(item, index) in $categoryList" :key="index">
      <h3>
        <router-link :to="'/' + item.name">{{ item.name }}</router-link>
      </h3>

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
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss"></style>
