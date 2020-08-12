<template>
  <!-- TODO: Refactor this -->
  <div class="wrapper">
    <section class="main">
      <div class="main__info">
        <h1 class="main__info__currentTemp">{{ weatherData.main.currentTemp }}&deg;</h1>
        <p class="main__info__temp">{{ weatherData.main.tempMax }}&deg; / {{ weatherData.main.tempMin }}&deg;</p>
        <p class="main__info__desc">{{ weatherData.main.description }}</p>
      </div>
      <div class="main__meta">
        <p class="main__meta__location">{{ weatherData.main.location }}</p>
        <p class="main__meta__dateUpdated">Обновлено: {{ weatherData.main.dateUpdated }}</p>
      </div>
    </section>
    <section class="hours">
      <div
        class="hour"
        v-for="(hourly, index) in weatherData.next24Hours"
        :key="hourly.time">
          <p class="hour__time" v-if="index > 0">
            {{ hourly.time }}
          </p>
          <p class="hour__time" v-else>Сейчас</p>
          <p class="hour__pop" v-if="hourly.pop">
            {{ hourly.pop }}%
          </p>
          <img class="hour__icon" :src="hourly.icon" />
          <p class="hour__temp">
            {{ hourly.temp }}&deg;C
          </p>
      </div>
    </section>
    <section class="days">
      <div
        class="day"
        v-for="(day, index) in weatherData.daily.slice(1)"
        :key="day.date.weekDay">
        <p class="day__date" v-if="index > 0">
          {{ day.date.weekDay }}, {{ day.date.day }} {{ day.month }}
        </p>
        <p class="day__date" v-else>
          Завтра, {{ day.date.day }} {{ day.month }}
        </p>
        <img class="day__icon" v-bind:src="day.icon" />
        <p class="day__temp">
          <span class="day__temp__max">{{ day.tempMax }}&deg;</span>/{{ day.tempMin }}&deg;
        </p>
      </div>
    </section>
    <section>
      <h2>Комфорт</h2>
      <div class="row">
        <div class="row__half comfort__humidity">
          <span class="comfort__humidity__label">Влажность</span>
          <q-circular-progress
            show-value
            color="primary"
            size="7rem"
            :value="weatherData.comfort.humidity">
              {{ weatherData.comfort.humidity }}%
          </q-circular-progress>
        </div>
        <div class="row__half comfort__misc">
          <p class="param">Ощущение <span class="param__value">{{ weatherData.comfort.feelsLike }}&deg;</span> </p>
          <p class="param">Индекс УФ <span class="param__value">{{ weatherData.comfort.uvi }}</span></p>
        </div>
      </div>
    </section>
    <section>
      <h2>Ветер</h2>
      <div class="row">
        <div class="row__half wind__windmills">
          <div class="wind__windmill first">
            <windmill />
          </div>
          <div class="wind__windmill second">
            <windmill />
          </div>
        </div>
        <div class="row__half wind__misc">
          <p class="param">
            Направление
            <span class="param__value">{{ weatherData.wind.direction }}</span>
          </p>
          <p class="param">
            Скорость:
            <span class="param__value">{{ weatherData.wind.speed }} м/с</span>
          </p>
        </div>
      </div>
    </section>
    <section class="daytime">
      <h2>Дневное время</h2>
      <div class="daytime__sun">
        <sun
          :borderWidth="2"
          :percentOfDaytimeLeft="percentOfDaytimeLeft"
        />
      </div>
      <div class="row">
        <p class="row__half daytime__sunrise">
          Восход: {{ weatherData.daytime.sunrise }}
        </p>
        <p class="row__half daytime__current">
          {{ localTime }}
        </p>
        <p class="row__half daytime__sunset">
          Закат: {{ weatherData.daytime.sunset }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Windmill from 'components/Windmill'
import Sun from 'components/Sun'
import {
  getTime,
  getDateFromTime,
  getPercentOfDaytimeLeft
} from 'src/utils/date'

export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  watch: {
    weatherData: function () {
      this.localTimeDate = this.weatherData.daytime.localTime
    }
  },
  created () {
    this.localTimeDate = this.weatherData.daytime.localTime
  },
  mounted () {
    this.clock = setInterval(this.setLocalTime, 1000)
  },
  methods: {
    setLocalTime () {
      this.localTimeDate = new Date(this.localTimeDate.getTime() + 1000)
      this.localTime = getTime(this.localTimeDate)
    }
  },
  data () {
    return {
      clock: null,
      localTimeDate: null,
      localTime: ''
    }
  },
  computed: {
    percentOfDaytimeLeft: function () {
      const sunrise = getDateFromTime(this.weatherData.daytime.sunrise)
      const sunset = getDateFromTime(this.weatherData.daytime.sunset)
      return getPercentOfDaytimeLeft(sunrise, sunset, this.localTimeDate)
    }
  },
  components: {
    Windmill,
    Sun
  },
  beforeDestroy () {
    clearInterval(this.clock)
  }
}
</script>

<style lang="scss" scoped>
  section {
    padding: 1em 0;
  }

  h2 {
    font-size: 2rem;
    margin: .5em 0 1em;
    padding: 0 .5em;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 0 1em;

    &__half {
      flex: 1;
    }
  }

  .wrapper {
    padding-bottom: 5em;
  }

  .main {
    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 3em 0;

      &__currentTemp {
        font-size: 5rem;
        margin: 0;
        margin-left: .2em;
      }

      &__temp {
        margin: 0;
      }

      &__desc {
        margin: 0;
      }
    }

    &__meta {
      &__location {
        text-align: center;
      }

      &__dateUpdated {
        font-size: .7rem;
        text-align: center;
      }
    }
  }

  .hours {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 0 1em;

    &::after {
      content: 'aft';
      visibility: hidden;
      display: block;
    }
  }

  .hour {
    padding: 1em;
    max-width: 3em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &__time {
      font-size: .7rem;
      margin-bottom: 0;
    }

    &__pop {
      font-size: .7rem;
      margin-bottom: 0;
    }

    &__icon {
      max-width: 2em;
      object-fit: contain;
    }

    &__temp {
      margin-bottom: 0;
    }
  }

  .hour + .hour {
    margin-left: 1em;
  }

  .day {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5em 1.5em;

    &__icon {
      height: 2rem;
      flex: 3;
      object-fit: contain;
    }

    &__date {
      flex: 1;
      margin-bottom: 0;
    }

    &__temp {
      flex: 1;
      text-align: right;
      margin-bottom: 0;
    }

    &__temp__max {
      font-weight: bold;
    }
  }

  .comfort {
    &__humidity {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__label {
        margin-bottom: 1em;
      }
    }

    &__misc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 3em;
    }
  }

  .wind {
    &__misc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 3em;
    }

    &__windmills {
      width: 100%;
      height: 0;
      padding-bottom: 50%;
      position: relative;
    }

    &__windmill {
      position: absolute;
      bottom: 40%;

      &.first {
        position: absolute;
        width: 70%;
      }

      &.second {
        position: absolute;
        width: 45%;
        right: 21%;
      }
    }
  }

  .daytime {
    padding: 0 1em;

    &__sun {
      width: 70%;
      margin: 0 auto;
    }

    &__sunrise {
      margin: 1em 0;
    }

    &__sunset {
      margin: 1em 0;
      text-align: right;
    }

    &__current {
      margin: 1em 0;
      text-align: center;
      font-weight: bold;
    }
  }
  .param {
    color: grey;

    &__value {
      color: #333;
    }
  }
</style>
