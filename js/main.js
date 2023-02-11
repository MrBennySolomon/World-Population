const view       = new View();
const model      = new Model();
const controller = new Controller(view, model);

controller.start();

const btnEurope    = document.querySelector('.europe');
const btnAsia      = document.querySelector('.asia');
const btnAmerica   = document.querySelector('.america');
const btnAfrica    = document.querySelector('.africa');
const countriesDiv = document.querySelector('.countries');


btnEurope.addEventListener("click",    () => {
  controller.btnEuropeClick();
});
btnAsia.addEventListener("click",      () => {
  controller.btnAsiaClick();
});
btnAmerica.addEventListener("click",   () => {
  controller.btnAmericaClick();
});
btnAfrica.addEventListener("click",    () => {
  controller.btnAfricaClick();
});
countriesDiv.addEventListener("click", (e) => {
  controller.countriesDivClick(e);
});