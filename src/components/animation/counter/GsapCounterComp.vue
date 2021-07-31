<template>
  <span>{{ count }}{{ unit }}</span>
</template>

<script>
import { TimelineLite } from 'gsap'

export default {
  props: ['data', 'unit', 'duration'],
  data() {
    return {
      count: 0
    }
  },
  methods: {
    animated(data) {
      var Cont = { val: 0 },
        NewVal = data
      const timeline = new TimelineLite()
      timeline.to(Cont, parseInt(this.duration), {
        val: NewVal,
        roundProps: 'val',
        onUpdate: () => {
          this.count = Cont.val
        }
      })
    }
  },
  mounted() {
    this.animated(this.data)
  },
  watch: {
    data(newData) {
      this.animated(newData)
    }
  }
}
</script>

<style></style>
