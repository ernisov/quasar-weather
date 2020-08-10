<template>
  <div>
    <input type="text" @input="search" v-model="query" >
    <p
      v-for="prediction in predictions"
      :key="prediction.locationId"
      @click="save(prediction)"
    >
      {{prediction.description}}
    </p>
  </div>
</template>

<script>
import getPlacePredictions from 'src/services/getPlacePredictions'
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
        const results = await getPlacePredictions(this.query)
        this.predictions = results.filter(result => {
          const there = this.savedLocations.find(l => l.locationId === result.locationId)
          return !there
        })
      } catch (e) {
        this.predictions = []
      }
    },
    async save (prediction) {
      const location = await getForecastLocation(prediction.description)
      this.savedLocations.push(saveForecastLocation(location))
      this.predictions = []
      this.query = ''
    }
  }
}
</script>
