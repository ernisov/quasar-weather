<template>
  <div>
    <div v-if="weatherData">
      <div v-if="$q.platform.is.capacitor">
        <q-pull-to-refresh @refresh="fetchData">
          <weather-data-mobile :weatherData="weatherData" />
        </q-pull-to-refresh>
      </div>
      <weather-data-mobile
        v-else-if="$q.platform.is.mobile"
        :weatherData="weatherData"
      />
    </div>
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
      this.fetchData()
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
    this.fetchData()
  },
  methods: {
    fetchData: async function (done) {
      this.loading = true
      const location = await getSavedForecastLocation(this.locationId)
      if (location) {
        this.weatherData = await getWeatherData(location)
        this.loading = false
        if (done) done()
      }
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
