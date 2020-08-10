<template>
  <div>
    <input type="text" @input="search" v-model="query" >
    <p
      v-for="prediction in predictions"
      :key="prediction.locationId"
      @click="save(prediction.locaitonId)"
    >
      {{prediction.description}}
    </p>
  </div>
</template>

<script>
import getPlacePredictions from 'src/services/getPlacePredictions'

export default {
  name: 'SearchLocaiton',
  data () {
    return {
      query: '',
      predictions: []
    }
  },
  methods: {
    async search (e) {
      try {
        this.predictions = await getPlacePredictions(this.query)
      } catch (e) {
        this.predictions = []
      }
    },
    async save (locaitonId) {
      console.log(locaitonId)
    }
  }
}
</script>
