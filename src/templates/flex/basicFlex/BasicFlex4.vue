<template>
  <div class="flex">
    <div class="form-group">
      <div class="row">
        <label>flex-direction</label>
        <div class="radio-group">
          <label v-for="(item, i) in flexDirection" :key="i">
            <i class="material-icons">
              {{ currentFlexDirection === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentFlexDirection" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
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
        <label>container height</label>
        <input type="text" v-model="height" />
      </div>
      <div class="row">
        <label>flex</label>
        <input type="text" v-model="flex" />
      </div>
      <div class="row">
        <label>item width</label>
        <input type="text" v-model="itemWidth" />
      </div>
      <div class="row">
        <label>item height</label>
        <input type="text" v-model="itemHeight" />
      </div>
      <div class="row">
        <label>justify-content</label>
        <div class="radio-group">
          <label v-for="(item, i) in justifyContent" :key="i">
            <i class="material-icons">
              {{ currentJustifyContent === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentJustifyContent" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>align-items</label>
        <div class="radio-group">
          <label v-for="(item, i) in alignItems" :key="i">
            <i class="material-icons">
              {{ currentAlignItems === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentAlignItems" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>align-content</label>
        <div class="radio-group">
          <label v-for="(item, i) in alignContent" :key="i">
            <i class="material-icons">
              {{ currentAlignContent === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentAlignContent" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>align-self</label>
        <div class="radio-group">
          <label v-for="(item, i) in alignSelf" :key="i">
            <i class="material-icons">
              {{ currentAlignSelf === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="currentAlignSelf" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
    </div>
    <div class="flex-container" :style="style">
      <div class="flex-item" :style="item">1</div>
      <div class="flex-item" :style="item + self">2</div>
      <div class="flex-item" :style="item">3</div>
      <div class="flex-item" :style="item">4</div>
      <div class="flex-item" :style="item">5</div>
      <div class="flex-item" :style="item">6</div>
      <div class="flex-item" :style="item">7</div>
      <div class="flex-item" :style="item">8</div>
      <div class="flex-item" :style="item">9</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
      flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
      currentFlexDirection: 'row',
      currentFlexWrap: 'nowrap',
      height: 'auto',
      flex: '1 1 50%',
      itemWidth: 'auto',
      itemHeight: 'auto',
      justifyContent: ['flex-start', ' flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      currentJustifyContent: 'flex-start',
      alignItems: ['stretch', ' flex-start', 'flex-end', 'center', 'baseline'],
      currentAlignItems: 'stretch',
      alignContent: ['flex-start', ' flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      currentAlignContent: 'flex-start',
      alignSelf: ['stretch', ' flex-start', 'flex-end', 'center', 'baseline'],
      currentAlignSelf: 'stretch'
    }
  },
  computed: {
    style() {
      return `height:${this.height};
              flex-direction:${this.currentFlexDirection};
              flex-wrap:${this.currentFlexWrap};
              justify-content:${this.currentJustifyContent};
              align-items:${this.currentAlignItems};
              align-content:${this.currentAlignContent};`
    },
    item() {
      return `flex:${this.flex};
              width:${this.itemWidth};
              height:${this.itemHeight};`
    },
    self() {
      return `align-self:${this.currentAlignSelf};`
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  flex-wrap: wrap;
  height: 20em;
}
.flex-item:nth-child(2) {
  font-size: 3em;
}
</style>
