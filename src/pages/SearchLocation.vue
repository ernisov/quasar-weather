<template>
  <div>
    <input type="text" @input="search" v-model="query" >
    <div v-if="predictions.length > 0">
      <p
        v-for="prediction in predictions"
        :key="prediction.locationId"
        @click="save(prediction)"
      >
        {{prediction.address}}
      </p>
    </div>
    <zero-results v-if="query && predictions.length === 0" />
  </div>
</template>

<script>
import ZeroResults from 'components/ZeroResults'
import getForecastLocationPredictions from 'src/services/getForecastLocationPredictions'
import getForecastLocation from 'src/services/getForecastLocation'
import getSavedForecastLocations from 'src/services/getSavedForecastLocations'
import saveForecastLocation from 'src/services/saveForecastLocation'

export default {
  name: 'SearchLocaiton',
  async created () {
    this.savedLocations = await getSavedForecastLocations()
  },
  data () {
    return {
      query: '',
      predictions: [],
      savedLocations: []
    }
  },
  methods: {
    async search (e) {
      try {
        const results = await getForecastLocationPredictions(this.query)
        this.predictions = results.filter(result => {
          const there = this.savedLocations.find(l => l.locationId === result.locationId)
          return !there
        })
      } catch (e) {
        this.predictions = []
      }
    },
    async save (prediction) {
      this.predictions = []
      this.query = ''
      const location = await getForecastLocation(prediction.address)
      const savedLocation = await saveForecastLocation(location)
      this.savedLocations.push(savedLocation)
      this.$router.push(`/${savedLocation.locationId}`)
    }
  },
  components: {
    ZeroResults
  }
}
</script>
