<template>
  <div v-if="weatherData">
    <weather-data-mobile
      v-if="$q.platform.is.mobile"
      :weatherData="weatherData"
    />
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
      const location = await getSavedForecastLocation(this.locationId)
      if (location) {
        this.weatherData = await getWeatherData(location)
      }
    }
  },
  data () {
    return {
      /**
       * @type {WeatherDataViewModel}
       */
      weatherData: null
    }
  },
  async created () {
    const location = await getSavedForecastLocation(this.locationId)
    if (location) {
      this.weatherData = await getWeatherData(location)
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
