<template>
  <q-item
    clickable
    tag="a"
    :to="'/' + location.locationId"
  >
    {{ location.label }}
  </q-item>
</template>

<script>
export default {
  name: 'CityNavItem',
  props: {
    location: {
      type: Object,
      required: false
    }
  }
}
</script>
