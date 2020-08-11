<template>
  <div v-if="weatherData">
    <div>
      <h1>{{ weatherData.forecast.current.temp }}</h1>
      <p>{{ weatherData.forecast.daily[0].tempMax }} / {{ weatherData.forecast.daily[0].tempMin }}</p>
      <p>{{ weatherData.forecast.current.weather.description }}</p>
      <p>{{ weatherData.label }}</p>
      <p>{{ weatherData.forecast.date | hours }}</p>
    </div>
    <hr>
    <div class="flex-row">
      <div
        class="hourly"
        v-for="(hourly, index) in weatherData.forecast.next24Hours"
        :key="hourly.time | time">
          <p v-if="index > 0">
            {{ hourly.time | hours }}
          </p>
          <p v-else>Сейчас</p>
          <p>
            {{ hourly.temp }}
          </p>
          <p v-if="hourly.pop">
            {{ hourly.pop }}%
          </p>
      </div>
    </div>
    <hr>
    <div>
      <div
        v-for="(day, index) in weatherData.forecast.daily.slice(1)"
        :key="day.date | time">
        <p v-if="index > 0">
          {{ day.date | weekDay }}, {{ day.date.getDate() }} {{ day.date | month }}
        </p>
        <p v-else>
          Завтра, {{ day.date.getDate() }} {{ day.date | month }}
        </p>
        <p>
          <span>{{ day.tempMax }}</span>/{{ day.tempMin }}
        </p>
      </div>
    </div>
    <hr>
    <div>
      <h2>Комфорт</h2>
      <p>Влажность: {{ weatherData.forecast.current.comfort.humidity }}</p>
      <p>Ощущение: {{ weatherData.forecast.current.comfort.feelsLike }}</p>
      <p>Индекс УФ: {{ weatherData.forecast.current.comfort.uvi }}</p>
    </div>
    <div>
      <h2>Ветер</h2>
      <p>Направление: {{ weatherData.forecast.current.wind.directionLabel }}</p>
      <p>Скорость: {{ weatherData.forecast.current.wind.speed }} м/с</p>
    </div>
    <div>
      <p>Восход: {{ weatherData.forecast.daily[0].sunrise | hours }}</p>
      <p>Закат: {{ weatherData.forecast.daily[0].sunset | hours }}</p>
    </div>
  </div>
</template>

<script>
import getSavedForecastLocation from 'src/services/getSavedForecastLocation'
import getWeatherData from 'src/services/getWeatherData'
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
       * @type {WeatherData}
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
  filters: {
    hours (date) {
      const hours = `0${date.getHours()}`.substr(-2)
      const minutes = `0${date.getMinutes()}`.substr(-2)
      return `${hours}:${minutes}`
    },
    weekDay (date) {
      const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      return weekDays[date.getDay()]
    },
    month (date) {
      const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'нояб', 'дек']
      return months[date.getMonth()]
    },
    time (date) {
      return date.getTime()
    }
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
