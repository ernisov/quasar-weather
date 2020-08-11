<template>
  <div class="wrapper">
    <main class="main">
      <router-view />
    </main>
    <div class="footer-nav">
      <div class="cities">
        <city-nav-item
          v-for="location in locations"
          :key="location && location.locationId"
          :location="location" />
        <q-item clickable class="add-city-button" @click="goToSearch">
          Добавить
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import CityNavItem from 'components/CityNavItem'
import getSavedForecastLocations from 'src/services/getSavedForecastLocations'
import getCurrentForecastLocation from 'src/services/getCurrentForecastLocation'
import saveForecastLocation from 'src/services/saveForecastLocation'

export default {
  name: 'MainLayout',
  async created () {
    try {
      const savedLocaitons = await getSavedForecastLocations()
      if (savedLocaitons.length === 0) {
        const currentLocation = await getCurrentForecastLocation()
        const created = await saveForecastLocation(currentLocation)
        this.locations.push(created)
        this.redirectToLocation(created)
      } else {
        this.locations = savedLocaitons
        if (!this.$route.params.locationId) {
          this.redirectToLocation(this.locations[0])
        }
      }
    } catch (e) {
      if (
        e instanceof window.GeolocationPositionError ||
        (window.PositionError && e instanceof window.PositionError)
      ) {
        this.$router.replace('search')
        return
      }

      // show something went wrong?
      // think about displaying errors
      // Nah. Maybe I'm just too serious
      // DB is always allowed. What about non browser env?
      // Add when test capacitor
      console.log(e)
    }
  },
  data () {
    return {
      locations: []
    }
  },
  methods: {
    redirectToLocation (location) {
      const futurePath = `/${location.locationId}`
      if (this.$route.path !== futurePath) {
        this.$router.replace(futurePath)
      }
    },
    goToSearch () {
      this.$router.push('search')
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
    padding-top: 1em;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
  }

  .cities {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
  }

  .add-city-button {
    color: grey;
  }
</style>
