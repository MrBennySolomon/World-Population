class Controller {
  constructor (view, model) {
    this.view  = view;
    this.model = model;
  }

  start() {
    this.model.fetchPopulation();
    this.introScreen();
  }

  async introScreen() {
    const countriesArr  = [];
    const populationArr = [];

    const data = await model.parse(model.getData('allPopulationData'));

    for (let i = 0; i < data.length; i++) {
      countriesArr.push(data[i].country);
      populationArr.push(data[i].populationCounts[0].value);
    }
    
    this.view.printChart('all countries', countriesArr, populationArr, '1');
  }

  getPopulation(data, country) {
    const citiesArr     = [];
    const yearsArr      = [];
    const populationArr = [];

    for (let i = 0; i < data.length; i++) {   
      if (data[i].country === country) {
        citiesArr.push(data[i].city);
        yearsArr.push(data[i].populationCounts[0].year);
        populationArr.push(data[i].populationCounts[0].value);
      }
    }
    
    this.view.printChart(country, citiesArr, populationArr, yearsArr);
  }

  countriesDivClick(e) {
    const countryName = e.target.getAttribute('country');
    this.view.startSpinner();
    this.model.fetchCountry(countryName).then((info) => this.view.setChartBackgroundFlag(info));
    this.view.stopSpinner();
    this.getPopulation(this.model.parse(this.model.getData('allPopulationData')), countryName);
  }

  btnAfricaClick() {
    this.fillCountries('africa', 'Africa');
  }

  btnAmericaClick() {
    this.fillCountries('america', 'Americas');
  }

  btnAsiaClick() {
    this.fillCountries('asia', 'Asia');
  }

  btnEuropeClick() {
    this.fillCountries('europe', 'Europe');
  }

  async fillCountries(region, dbName) {
    this.view.emptyCountries();
    if (!this.model.getData(region)) {
      const data = await this.model.parse(this.model.getData(region));
      for (let i = 0; i < data.length; i++) {
        this.view.countriesDiv.innerHTML += `
          <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="90%" height="70%"></button>
        `;
      }
    }else{
      this.view.startSpinner();
      this.model.fetchRegion(dbName).then((data) => {
        this.view.stopSpinner();
        this.model.setData(region, this.model.stringify(data));
        for (let i = 0; i < data.length; i++) {
          this.view.countriesDiv.innerHTML += `
            <button class="flags-btn font-effect-neon">${data[i].name.common}<img country="${data[i].name.common}" src="${data[i].flags.png}" width="90%" height="70%"></button>
          `;
        }
      });
    }
  }
}