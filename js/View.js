
class View {
  constructor() {
    this.ctx          = document.getElementById('myChart');
    this.chart        = document.querySelector('.chart');
    this.spinner      = document.getElementById('spinner');
    this.countriesDiv = document.querySelector('.countries');
  }

  resetChart() {
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  }

  printChart(country, citiesArr, populationArr, yearsArr) {
    this.resetChart();
    return new Chart(this.ctx, {
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
        plugins: {
          title: {
              display: true,
              text: country
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  setChartBackgroundFlag(info) {
    this.chart.style.background = `url(${info[0].flags.png}) no-repeat center center/contain`;
  }

  startSpinner() {
    this.spinner.removeAttribute("hidden");
  }

  stopSpinner() {
    this.spinner.setAttribute("hidden", "");
  }

  emptyCountries() {
    this.countriesDiv.innerHTML = "";
  }
}