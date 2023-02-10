  const btnEurope  = document.querySelector('.europe');
  const btnAsia    = document.querySelector('.asia');
  const btnAmerica = document.querySelector('.america');
  const btnAfrica  = document.querySelector('.africa');

  const ctx = document.getElementById('myChart');
  const printChart = (country, citiesArr, populationArr, yearsArr) => {
    new Chart(ctx, {
      type: 'bar',
      data: {
        
        labels: [...citiesArr],
        datasets: [{
          label: yearsArr[0],
          borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
          backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
  
          data: [...populationArr],
          borderWidth: 2
        }]
      },
      options: {
        
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  


  const fetchCountry = async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const info = await response.json();

    ctx.style.background = `url(${info[0].flags.png}) no-repeat center center/cover`;
    //localStorage.setItem('countryData', info);
    return info;
  };
  
  const israel = fetchCountry('israel');
  const france = fetchCountry('france');

  const fetchRegion = async (region) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const info = await response.json();
    //localStorage.setItem('continentsData', info);
    return info;
  };
  
  const europe = fetchRegion('africa');

  const fetchPopulation = async () => {
    const response = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
    const info = await response.json();
    //localStorage.setItem('populationData', info.data);
    //getPopulation(info.data, 'Israel');
    getPopulation(info.data, 'France');
  };
  
  const allPopulation = fetchPopulation();
  
  const getPopulation = async (data, country) => {
    const citiesArr = [];
    const yearsArr = [];
    const populationArr = [];
    for (let i = 0; i < data.length; i++) {
      const obj = {};
      obj.data = [];
      if (data[i].country === country) {
        const citySet = new Set();


        for (let j = 0; j < data[i].populationCounts.length; j++) {
          
          
          if (data[i].populationCounts[j].value !== 'null' &&
              data[i].city != Number(data[i].city)) {
                citySet.add(data[i].city);

              
            obj.data.push(
              {
                city:       data[i].city,
                year:       data[i].populationCounts[j].year,
                population: data[i].populationCounts[j].value
              }
            );
          }
        }
        citiesArr.push(data[i].city);
        yearsArr.push(data[i].populationCounts[0].year);
        populationArr.push(data[i].populationCounts[0].value);
        //localStorage.setItem(`${data[i].country}-${data[i].city}`, JSON.stringify(obj));
      }
    }
    //console.log(localStorage.getItem('israel-Ashdod'));
    // console.log(citiesArr);
    // console.log(yearsArr);
    // console.log(populationArr);
    printChart('israel', citiesArr, populationArr, yearsArr)
  }

btnEurope.addEventListener('click', (event) => {
  const europe = fetchRegion('Europe');
  console.log('europe', europe);
});
btnAsia.addEventListener('click', (event) => {
  const asia = fetchRegion('Asia');
  console.log('asia', asia);

});
btnAmerica.addEventListener('click', (event) => {
  const america = fetchRegion('Americas');
  console.log('america', america);
});
btnAfrica.addEventListener('click', (event) => {
  const africa = fetchRegion('Africa');
  console.log('africa', africa);
});