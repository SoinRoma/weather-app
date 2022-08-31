const tempBlock = document.querySelector('#temp');
const cityBlock = document.querySelector('#city');
const update_date = document.querySelector('#update-date');
const local_date = document.querySelector('#local-date');
const searchInp = document.querySelector('.search');

setInterval(() => {
    let date = new Date;
    local_date.textContent = `Текущее время: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}, 1000);

let city = 'Tashkent';

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init();
        searchInp.value = '';
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d982b206b7125a363d94918d08ebf560`)
        .then((resp) => {return resp.json()})
        .then((data) => {

            tempBlock.textContent = `${temperature()}°`;

            cityBlock.textContent = `Город: ${data.name}`;

            function temperature() {
                let getTemp = data.main.temp;
                let tempC = Math.floor(getTemp) - 273;
                return tempC;
            }

            let date = new Date;
            update_date.textContent = `Обновленно: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        })
        .catch(() => {
            alert('This city not found');
            city = 'London';
            init();
            searchInp.value = '';
        })
}

init()

setInterval(() => {
    init()
}, 10000) //Обновляет инфу каждые 10секунд

