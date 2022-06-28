const min = 1000;
const max = 9999;
const log = document.querySelector("#info");

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
randomNumber(min, max);

let a = randomNumber(min, max).toString();
let b = randomNumber(min, max).toString();
let c = randomNumber(min, max).toString();
let d = randomNumber(min, max).toString();
let f = randomNumber(min, max).toString();
let g = randomNumber(min, max).toString();

let numbers = [a, b, c, d, f, g];
// console.log(numbers);

let lowestToHighest = numbers.sort((a, b) => a - b);

// console.log(lowestToHighest);

info.append(lowestToHighest);

// let x = `${a} ${b} ${c} ${d}; ${f} ${g}`;
// console.log(a, b, c, d, f, g);

// function sorting(a, b, c, d, f, g) {
//     return
// }
// function sorting(a, b, c, d, f, g)
// Sugeneruokite 6 kintamuosius kurių reikšmės būtų atsitiktiniai skaičiai nuo 1000 iki 9999.
// Atspausdinkite reikšmes viename strige, išrūšiuotas nuo didžiausios iki mažiausios, atskirtas tarpais.
// Naudoti ciklų ir masyvų NEGALIMA.
