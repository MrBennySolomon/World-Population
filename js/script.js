const btnEurope       = document.querySelector('.europe');
const btnAsia         = document.querySelector('.asia');
const btnAmerica      = document.querySelector('.america');
const btnAfrica       = document.querySelector('.africa');
const countriesDiv    = document.querySelector('.countries');
const chart           = document.querySelector('.chart');
const spinner         = document.getElementById('spinner');
const ctx             = document.getElementById('myChart');
let allPopulation;
const printChart        = (country, citiesArr, populationArr, yearsArr) => {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...citiesArr],
      datasets: [
        {
          label: yearsArr[0],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)"
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)"
          ],
          data: [...populationArr],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
const fetchCountry    = async (country)                               => {
  spinner.removeAttribute("hidden");
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const info = await response.json();
    spinner.setAttribute("hidden", "");
    chart.style.background = `url(${info[0].flags.png}) no-repeat center center/contain`;
    return info;
  } catch (error) {
    throw new Error("fetch country went wrong");
  }
};
const fetchRegion     = async (region)                                => {
  spinner.removeAttribute("hidden");
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const info = await response.json();
    spinner.setAttribute("hidden", "");
    return info;
  } catch (error) {
    spinner.setAttribute("hidden", "");
    throw new Error("fetch region went wrong");
  }
};
const fetchPopulation = async ()                                      => {
  spinner.removeAttribute("hidden");
  try {
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/population/cities`
    );
    const info = await response.json();
    spinner.setAttribute("hidden", "");
    return info.data;
  } catch (error) {
    spinner.setAttribute("hidden", "");
    throw new Error("fetch population went wrong");
  }
};
allPopulation         = fetchPopulation().then((data) => allPopulation = data);
const getPopulation   = async (data = allPopulation, country)                         => {
  const citiesArr     = [];
  const yearsArr      = [];
  const populationArr = [];

  for (let i = 0; i < data.length; i++) {
    const obj = {};
    obj.data = [];
    if (data[i].country === country) {
      const citySet = new Set();
      for (let j = 0; j < data[i].populationCounts.length; j++) {
        if (
          data[i].populationCounts[j].value !== "null" &&
          data[i].city != Number(data[i].city)
        ) {
          citySet.add(data[i].city);

          obj.data.push({
            city: data[i].city,
            year: data[i].populationCounts[j].year,
            population: data[i].populationCounts[j].value
          });
        }
      }
      citiesArr.push(data[i].city);
      yearsArr.push(data[i].populationCounts[0].year);
      populationArr.push(data[i].populationCounts[0].value);
    }
  }
  let chartStatus = Chart.getChart("myChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  printChart("israel", citiesArr, populationArr, yearsArr);
  localStorage.setItem("allPopulationData", JSON.stringify(data));
};
btnEurope.addEventListener("click", (event)                           => {
  countriesDiv.innerHTML = "";
  fetchRegion("Europe").then((data) => {
    localStorage.setItem("europe", JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      countriesDiv.innerHTML += `
        <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
      `;
    }
  });
});
btnAsia.addEventListener("click", (event)                             => {
  countriesDiv.innerHTML = "";
  fetchRegion("Asia").then((data) => {
    localStorage.setItem("asia", JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      countriesDiv.innerHTML += `
        <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
      `;
    }
  });
});
btnAmerica.addEventListener("click", (event)                          => {
  countriesDiv.innerHTML = "";
  fetchRegion("Americas").then((data) => {
    localStorage.setItem("america", JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      countriesDiv.innerHTML += `
        <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
      `;
    }
  });
});
btnAfrica.addEventListener("click", (event)                           => {
  countriesDiv.innerHTML = "";
  fetchRegion("Africa").then((data) => {
    localStorage.setItem("africa", JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      countriesDiv.innerHTML += `
        <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
      `;
    }
  });
});
countriesDiv.addEventListener("click", (e)                            => {
  fetchCountry(e.target.getAttribute("country"));
  getPopulation(
    JSON.parse(localStorage.getItem("allPopulationData")),
    e.target.getAttribute("country")
  );
});
