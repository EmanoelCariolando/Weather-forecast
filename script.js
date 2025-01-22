
    document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()  

    let input = document.querySelector('#searchInput').value;
    console.log(input)

    if(input !== ''){
        hideInfo()
        showAlert('Carregando...');
    }else {
        hideInfo();
        showAlert('Digite uma cidade!');
    }

    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=da5d23d0b8b46f4a9cdf5448f9e67121&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
    
    if(json.cod === 200){
        console.log(json);
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
            description: json.weather[0].description
        });
    }else {
        hideInfo(),
        showAlert(`Cidade Não Encontrada!`);

    }
  


  function showAlert(msg){
    document.querySelector('.aviso').innerHTML = `${msg}`
  }

 function showInfo(json){
     document.querySelector('.aviso').innerHTML = '';
     document.querySelector('.resultado').style.display = 'block';
     document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
     document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
     document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
     document.querySelector('.resultado').style.display = 'block';
     document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`);
     document.querySelector('.ventoPonto').style.transform = `rotate(${json.windSpeed - 90}deg)`;
 }
    });


    function hideInfo(){
        document.querySelector('.resultado').style.display = 'none';
    }