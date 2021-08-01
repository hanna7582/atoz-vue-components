<template>
  <div class="grid">
    <div class="form-group">
      <div class="row">
        <label>grid-template-columns</label>
        <input type="text" v-model="grid_template_columns" />
      </div>
      <div class="row">
        <label>place-items</label>
        <input type="text" :value="current_align_items + ' ' + current_justify_items" readonly />
      </div>
      <div class="row">
        <label>place-content</label>
        <input type="text" :value="current_align_content + ' ' + current_justify_content" readonly />
      </div>
      <div class="row">
        <label>place-self</label>
        <input type="text" :value="current_align_self + ' ' + current_justify_self" readonly />
      </div>
      <div class="row">
        <label>align-items</label>
        <div class="radio-group">
          <label v-for="(item, i) in align_items" :key="'align_items_' + i">
            <i class="material-icons">
              {{ current_align_items === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_align_items" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>justify-items</label>
        <div class="radio-group">
          <label v-for="(item, i) in justify_items" :key="'justify_items_' + i">
            <i class="material-icons">
              {{ current_justify_items === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_justify_items" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>align-content</label>
        <div class="radio-group">
          <label v-for="(item, i) in align_content" :key="'align_content_' + i">
            <i class="material-icons">
              {{ current_align_content === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_align_content" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>justify-content</label>
        <div class="radio-group">
          <label v-for="(item, i) in justify_content" :key="'justify_content_' + i">
            <i class="material-icons">
              {{ current_justify_content === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_justify_content" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>align-self</label>
        <div class="radio-group">
          <label v-for="(item, i) in align_self" :key="'align_self_' + i">
            <i class="material-icons">
              {{ current_align_self === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_align_self" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
      <div class="row">
        <label>justify-self</label>
        <div class="radio-group">
          <label v-for="(item, i) in justify_self" :key="'justify_self_' + i">
            <i class="material-icons">
              {{ current_justify_self === item ? 'radio_button_checked' : 'radio_button_unchecked' }}
            </i>
            <input type="radio" v-model="current_justify_self" :value="item" />
            {{ item }}
          </label>
        </div>
      </div>
    </div>
    <div class="grid-container" :style="style">
      <div class="grid-item">1</div>
      <div class="grid-item" :style="self">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid_template_columns: 'repeat(3, 1fr)',
      align_items: ['stretch', 'start', 'center', 'end'],
      justify_items: ['stretch', 'start', 'center', 'end'],
      align_content: ['stretch', 'start', 'center', 'end', 'space-between', 'space-around ', 'space-evenly'],
      justify_content: [
        'stretch',
        'start',
        'center',
        'end',
        'space-between',
        'space-around ',
        'space-evenly'
      ],
      align_self: ['stretch', 'start', 'center', 'end'],
      justify_self: ['stretch', 'start', 'center', 'end'],
      current_align_items: 'stretch',
      current_justify_items: 'stretch',
      current_align_content: 'stretch',
      current_justify_content: 'stretch',
      current_align_self: 'stretch',
      current_justify_self: 'stretch'
    }
  },
  computed: {
    style() {
      return `height: 20em;
              grid-template-columns:${this.grid_template_columns};
              align-items:${this.current_align_items};
              justify-items:${this.current_justify_items};
              align-content:${this.current_align_content};
              justify-content:${this.current_justify_content};
              `
    },
    self() {
      return `align-self:${this.current_align_self};
              justify-self:${this.current_justify_self};`
    }
  }
}
</script>

<style lang="scss" scoped></style>
