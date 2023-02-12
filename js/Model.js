class Model {
  getData(key) {
    return localStorage.getItem(key);
  }

  setData(key, value) {
    localStorage.setItem(key, value);
  }

  stringify(data) {
    return JSON.stringify(data);
  }

  parse(str) {
    return JSON.parse(str);
  }

  async fetchCountry(country) {
    localStorage.setItem(country, country);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      const info = await response.json();      
      return info;
    } catch (error) {throw new Error("fetch country went wrong")}
  }

  async fetchRegion(region) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const info = await response.json();
      return info;
    } catch (error) {throw new Error("fetch region went wrong")}
  }

  async fetchPopulation() {
    try {
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`);
      response.json().then((info) => {
        localStorage.setItem("allPopulationData", JSON.stringify(info.data));
      }) 
    } catch (error) {throw new Error("fetch population went wrong")}
  }
}