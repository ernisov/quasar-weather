<template>
  <div class="wrapper">
    <main class="main">
      <router-view />
    </main>
    <div class="footer-nav">
      <city-nav-item
        v-for="location in locations"
        :key="location.name"
        :location="location" />
    </div>
  </div>
</template>

<script>
import CityNavItem from 'components/CityNavItem'

export default {
  name: 'MainLayout',
  data () {
    return {
      locations: [
        {
          name: 'bishkek',
          label: 'Бишкек',
          order: 1
        },
        {
          name: 'moscow',
          label: 'Москва',
          order: 2
        }
      ]
    }
  },
  components: {
    CityNavItem
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
  }

  .footer-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 1px solid grey;
  }
</style>
