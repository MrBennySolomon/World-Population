class Controller {
  constructor (view, model) {
    this.view  = view;
    this.model = model;
  }

  start() {
    this.model.fetchPopulation();
    this.introScreen();
  }

  async getPopulation(data, country) {
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
    
    this.view.printChart(country, citiesArr, populationArr, yearsArr);
  }

  async introScreen() {
    this.view.startSpinner();
    const countriesArr  = [];
    const yearsArr      = [];
    const populationArr = [];
    const data = JSON.parse(localStorage.getItem('allPopulationData'));

    for (let i = 0; i < data.length; i++) {
      const obj = {};
      obj.data = [];
      const countrySet = new Set();
      if (data[i].populationCounts[0].value !== "null" && data[i].country != Number(data[i].country)) {
        countrySet.add(data[i].country);
      }

      countriesArr.push(data[i].country);
      yearsArr.push(data[i].populationCounts[0].year);
      populationArr.push(data[i].populationCounts[0].value);
    }
    
    this.view.printChart('all countries', countriesArr, populationArr, '1');
    this.view.stopSpinner();
  }

  countriesDivClick(e) {
    const countryName = e.target.getAttribute('country');
    this.view.startSpinner();
    this.model.fetchCountry(countryName).then((info) => this.view.setChartBackgroundFlag(info));
    this.view.stopSpinner();
    this.getPopulation(this.model.parse(this.model.getData('allPopulationData')), countryName);
  }

  btnAfricaClick() {
    this.view.emptyCountries();
    if (!this.model.getData('africa')) {
      const data = this.model.parse(this.model.getData('africa'));
      for (let i = 0; i < data.length; i++) {
        this.view.countriesDiv.innerHTML += `
          <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
        `;
      }
    }else{
      this.view.startSpinner();
      this.model.fetchRegion("Africa").then((data) => {
        this.view.stopSpinner();
        this.model.setData("africa", this.model.stringify(data));
        for (let i = 0; i < data.length; i++) {
          this.view.countriesDiv.innerHTML += `
            <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
          `;
        }
      });
    }
  }

  btnAmericaClick() {
    this.view.emptyCountries();
    if (!this.model.getData('america')) {
      const data = this.model.parse(this.model.getData("america"));
      for (let i = 0; i < data.length; i++) {
        this.view.countriesDiv.innerHTML += `
          <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
        `;
      }
    }else{
      this.view.startSpinner();
      this.model.fetchRegion("Americas").then((data) => {
        this.view.stopSpinner();
        this.model.setData("america", this.model.stringify(data));
        for (let i = 0; i < data.length; i++) {
          this.view.countriesDiv.innerHTML += `
            <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
          `;
        }
      });
    }
  }

  btnAsiaClick() {
    this.view.emptyCountries();
    if (!this.model.getData('asia')) {
      const data = this.model.parse(this.model.getData('asia'));
      for (let i = 0; i < data.length; i++) {
        this.view.countriesDiv.innerHTML += `
          <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
        `;
      }
    }else{
      this.view.startSpinner();
      this.model.fetchRegion("Asia").then((data) => {
        this.view.stopSpinner();
        this.model.setData('asia', this.model.stringify(data));
        for (let i = 0; i < data.length; i++) {
          this.view.countriesDiv.innerHTML += `
            <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
          `;
        }
      });
    }
  }

  btnEuropeClick() {
    this.view.emptyCountries();
    if (!this.model.getData('europe')) {
      const data = model.parse(this.model.getData('europe'));
      for (let i = 0; i < data.length; i++) {
        this.view.countriesDiv.innerHTML += `
          <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
        `;
      }
    }else{
      this.view.startSpinner();
      this.model.fetchRegion("Europe").then((data) => {
        this.view.stopSpinner();
        this.model.setData('europe', this.model.stringify(data));
        for (let i = 0; i < data.length; i++) {
          this.view.countriesDiv.innerHTML += `
            <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="100px" height="60px"></button>
          `;
        }
      });
    }
  }
}

