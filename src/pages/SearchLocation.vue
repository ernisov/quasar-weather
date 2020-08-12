<template>
  <div>
    <div class="search__container">
      <q-input
        ref="search"
        type="text"
        @input="search"
        v-model="query">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-list padding v-if="predictions.length > 0">
      <q-item
        v-for="prediction in predictions"
        :key="prediction.locationId"
        @click="save(prediction)"
        clickable
        v-ripple>
        <q-item-section>
          {{ prediction.address }}
        </q-item-section>
      </q-item>
    </q-list>
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
  mounted () {
    this.$refs.search.$el.focus()
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

<style lang="scss" scoped>
  .search__container {
    margin: 0 1em;
  }
</style>
