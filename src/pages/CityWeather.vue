<template>
  <transition name="slide">
    <p>Page: {{ city }}</p>
  </transition>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      city: null
    }
  }
}
</script>
