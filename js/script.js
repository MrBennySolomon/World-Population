  'use strict';

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        // tickcolor: 'red',
        label: '# of Votes',
        borderColor: ['red', 'blue', 'yellow'],
        backgroundColor: ['blue', 'yellow', 'red'],

        data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        borderWidth: 5
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


  const fetchCountry = async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const info = await response.json();
    console.log('country', info);
    ctx.style.background = `url(${info[0].flags.png}) no-repeat center center/cover`;
    localStorage.setItem('israel', JSON.stringify(info));
    return info;
  };
  
  const israel = fetchCountry('israel');

  const fetchRegion = async (region) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const info = await response.json();
    console.log('europe', info);
    localStorage.setItem('europe', JSON.stringify(info));
    return info;
  };
  
  const europe = fetchRegion('africa');

  const fetchPopulation = async () => {
    const response = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
    const info = await response.json();
    console.log('all-population', info.data);
    localStorage.setItem('all-population', JSON.stringify(info));
    return info.data;
  };
  
  const allPopulation = fetchPopulation();

  for (let i = 0; i < allPopulation.length; i++) {
    console.log(allPopulation[i].country);
  }
