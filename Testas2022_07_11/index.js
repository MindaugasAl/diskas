class Vaisiai {
  constructor() {
    this.dydis = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
    this.id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    this.prakastas = false;
  }
  setPrakasti(prakastas) {
    this.prakasti = prakastas;
  }
  getPrakastas() {
    return (this.prakastas = true);
  }
}

const vaisius = new Vaisiai();
vaisius.getPrakastas();
// console.log(vaisius);

class Krepsys {
  static vaisiai = [];

  static pripildyti() {
    for (let i = 1; i <= 20; i++) {
      this.vaisiai.push(new Vaisiai());
      this.vaisiai.sort((a, b) => b.dydis - a.dydis);
    }
    return this;
  }
  static isimti() {
    return this.vaisiai.shift();
  }
}
// const grauztukai = new Map();
// console.log(grauztukai);
//
// console.log("eiline nesekme");
Krepsys.pripildyti();
console.log(Krepsys);
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
Krepsys.isimti();
console.log(Krepsys);
Krepsys.pripildyti();
console.log(Krepsys);

// console.log(grauztukai);
