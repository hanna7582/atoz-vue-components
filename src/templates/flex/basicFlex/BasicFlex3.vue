<template>
  <div class="flex">
    <div class="form-group">
      <div class="row">
        <label>flex-wrap</label>
        <div class="radio-group">
          <label v-for="(item, i) in flexWrap" :key="i">
            <i class="material-icons">
              {{ currentFlexWrap === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentFlexWrap" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>flex(아이템 모두 같은 값)</label>
        <input type="text" v-model="flex" />
      </div>
    </div>
    <div class="flex-container" :style="style">
      <div class="flex-item" :style="item">1 a</div>
      <div class="flex-item" :style="item">
        2 Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div class="flex-item" :style="item">3 ccc</div>
    </div>
    <div class="form-group">
      <div class="row">
        <label>flex(item1)</label>
        <input type="text" v-model="item1Flex" />
      </div>
      <div class="row">
        <label>flex(item2)</label>
        <input type="text" v-model="item2Flex" />
      </div>
      <div class="row">
        <label>flex(item3)</label>
        <input type="text" v-model="item3Flex" />
      </div>
    </div>
    <div class="flex-container">
      <div class="flex-item" :style="item1">1 a</div>
      <div class="flex-item" :style="item2">
        2 Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div class="flex-item" :style="item3">3 ccc</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
      currentFlexWrap: 'wrap',
      flex: '1 1 50%',
      item1Flex: '0 0 50px',
      item2Flex: 1,
      item3Flex: '0 0 100px'
    }
  },
  computed: {
    style() {
      return `flex-wrap:${this.currentFlexWrap}`
    },
    item() {
      return `flex:${this.flex};`
    },
    item1() {
      return `flex:${this.item1Flex};`
    },
    item2() {
      return `flex:${this.item2Flex};`
    },
    item3() {
      return `flex:${this.item3Flex};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
