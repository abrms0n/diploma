export function rusifyDate(date) {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    let rusDate = date.split('T');
    rusDate = rusDate[0];
    rusDate = rusDate.split('-');
    rusDate = `${rusDate[2]} ${months[rusDate[1]-1]}, ${rusDate[0]}`;
    if (rusDate.split('')[0] === '0') {
        return rusDate.substr(1,);
    } else {
        return rusDate;
    }
}

export function renderError(isError, elem, error) { 
    if (isError) {
        elem.classList.add(`${elem.classList[0]}_is-hidden`);
        error.classList.add('not-found_is-visible');
    } else {
        elem.classList.remove(`${elem.classList[0]}_is-hidden`);
        error.classList.remove('not-found_is-visible');
    }
}


export function renderLoading(isLoading, elem, preloader) {
    if (isLoading) {
        elem.classList.add(`${elem.classList[0]}_is-hidden`);
        preloader.classList.add('preloader_is-visible')
    } else {
        elem.classList.remove(`${elem.classList[0]}_is-hidden`);
        preloader.classList.remove('preloader_is-visible')
    }
}

export function getLastWeek(date) {
    date = date.split('-');
    date = new Date(date[0], date[1], date[2]-7);
    date = [date.getFullYear(),date.getMonth(),date.getDate()];
    date = date.join('-');
    return date
}

export function renderWeekDay(date) {
    return `${date.toLocaleString('ru', {day: 'numeric'})}, ${date.toLocaleString('ru', {weekday: 'short'})}`
}

export function toIsoDate(date) {
    date = date.toISOString();
    date = date.split('T')[0];
    return date;
}

export function calcPercents(date) {
    const news = JSON.parse(localStorage.news);
    const isoDate = toIsoDate(date);
    
    const dates = news.map(item => {
        return item = item.publishedAt;
    })

    const results = dates.filter(item => {
        return item.includes(isoDate)
    })
    return results.length;
}