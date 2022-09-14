const myName = "Mindaugas";
const mySecondName = "Alšauskas";
const birthDay = 1982;
const thisYear = 2022;

const log = document.querySelector("#info");

function my() {
  return `Aš esu ${myName} ${mySecondName}. Man yra ${
    thisYear - birthDay
  } metų`;
}
my();

info.append(my());
