

  const ctx = document.getElementById('myChart');
  const printChart = (country, city, yearArr, populationArr) => {
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
  }
  


  const fetchCountry = async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const info = await response.json();

    ctx.style.background = `url(${info[0].flags.png}) no-repeat center center/cover`;

    return info;
  };
  
  const israel = fetchCountry('israel');

  const fetchRegion = async (region) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const info = await response.json();

    return info;
  };
  
  const europe = fetchRegion('africa');

  const fetchPopulation = async () => {
    const response = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
    const info = await response.json();

    getPopulation(info.data);
  };
  
  const allPopulation = fetchPopulation();
  
  const getPopulation = async (data) => {
    for (let i = 0; i < data.length; i++) {
    
      const obj   = {};
      obj.data    = [];

      for (let j = 0; j < data[i].populationCounts.length; j++) {
        
        
        if (data[i].populationCounts[j].value !== 'null' &&
            data[i].city != Number(data[i].city)) {
          obj.data.push(
            {
              city:       data[i].city,
              year:       data[i].populationCounts[j].year,
              population: data[i].populationCounts[j].value
            }
          );
        }
      }
      localStorage.setItem(`${data[i].country}-${data[i].city}`, JSON.stringify(obj));
    }
    //console.log(localStorage.getItem('israel-Ashdod'));
    //printChart('israel', localStorage.get('israel')[0].city, localStorage.get('israel')[0].year, localStorage.get('israel')[0].population )
  }