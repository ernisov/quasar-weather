<template>
  <q-item
    clickable
    tag="a"
    :to="location.name"
  >
    {{ location.label }}
  </q-item>
</template>

<script>
export default {
  name: 'CityNavItem',
  props: ['location']
}
</script>
