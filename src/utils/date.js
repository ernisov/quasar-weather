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

export {
  getHours,
  getWeekDay,
  getMonth
}
