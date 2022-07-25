function epochToDate(epoch) {
    return new Date(epoch * 1000).toLocaleString('ru-ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default epochToDate;