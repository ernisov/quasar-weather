function getHours (date) {
  const hours = `0${date.getHours()}`.substr(-2)
  const minutes = `0${date.getMinutes()}`.substr(-2)
  return `${hours}:${minutes}`
}

function getWeekDay (date) {
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  return weekDays[date.getDay()]
}

function getMonth (date) {
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'нояб', 'дек']
  return months[date.getMonth()]
}

function getTime (date) {
  const seconds = `0${date.getSeconds()}`.substr(-2)
  return getHours(date) + ':' + seconds
}

/**
 *
 * @param {Date} sunrise
 * @param {Date} sunset
 */
function getPercentOfDaytimeLeft (sunrise, sunset, now) {
  const sunriseTime = sunrise.getTime()
  const sunsetTime = sunset.getTime()
  const daytime = sunsetTime - sunriseTime

  if (now.getTime() - sunriseTime <= 0) {
    return 1
  }

  if (now.getTime() - sunsetTime >= 0) {
    return 0
  }

  return 1 - +((now.getTime() - sunriseTime) / daytime).toFixed(2)
}

function getDateFromTime (time) {
  const splitted = time.split(':')
  const hours = parseInt(splitted[0])
  const minutes = parseInt(splitted[1])
  const date = new Date()
  date.setHours(hours, minutes, 0)
  return date
}

export {
  getHours,
  getWeekDay,
  getMonth,
  getTime,
  getPercentOfDaytimeLeft,
  getDateFromTime
}
