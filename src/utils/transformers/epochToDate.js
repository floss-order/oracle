function epochToDate(epoch, time) {
  return new Date(epoch * 1000).toLocaleString('ru-ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: time && 'numeric',
    minute: time && 'numeric',
    second: time && 'numeric',
  });
}

export default epochToDate;
