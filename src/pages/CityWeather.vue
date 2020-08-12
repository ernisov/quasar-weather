<template>
  <div v-if="weatherData">
    <weather-data-mobile
      v-if="$q.platform.is.mobile"
      :weatherData="weatherData"
    />
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
  </div>
</template>

<script>
import getSavedForecastLocation from 'src/services/getSavedForecastLocation'
import getWeatherData from 'src/services/getWeatherData'
import WeatherDataMobile from 'components/WeatherData.mobile.vue'

export default {
  name: 'PageIndex',
  props: {
    locationId: {
      type: String
    }
  },
  watch: {
    async locationId () {
      this.loading = true
      const location = await getSavedForecastLocation(this.locationId)
      if (location) {
        this.weatherData = await getWeatherData(location)
        this.loading = false
      }
    }
  },
  data () {
    return {
      /**
       * @type {WeatherDataViewModel}
       */
      weatherData: null,
      loading: true
    }
  },
  async created () {
    const location = await getSavedForecastLocation(this.locationId)
    if (location) {
      this.weatherData = await getWeatherData(location)
      this.loading = false
    }
  },
  components: {
    WeatherDataMobile
  }
}
</script>

<style lang="scss" scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .hourly {
    padding: 0 1rem;
  }
</style>
