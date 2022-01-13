const przyciskStart = document.querySelector(".start");
const przyciskWynik = document.querySelector(".wynik");
const przyciskPozycja = document.querySelector(".pozycja");
const przyciskLitera = document.querySelector(".litera");
const przyciskKolor = document.querySelector(".kolor");
const inputPoziomTrudnosci = document.querySelector("#inputPoziomTrudnosci");
const ostatnieWyniki = document.querySelector("#ostatnieWyniki");

let poziomTrudnosci = 2;
let poziomKoloryAktywny = false;

let wyniki = [];
let wynikiPoziomTrudnosci = [];
let wynikiMaxWynik = [];
let historiaWynikow = "";

// wyswietlanie historii wynikow
if (localStorage.getItem("historiaPoziomTrudnosci0") === null) {
  localStorage.setItem("historiaPoziomTrudnosci0", 9);
} else {
  historiaWynikow = `1. Poziom trudności ${localStorage.getItem(
    "historiaPoziomTrudnosci0"
  )}, wynik ${localStorage.getItem("historiaWynik0")}/${localStorage.getItem(
    "historiaMaxWynik0"
  )} <br><br>`;
}

if (
  localStorage.getItem("historiaPoziomTrudnosci1") === null ||
  localStorage.getItem("historiaPoziomTrudnosci1") > 8
) {
  localStorage.setItem("historiaPoziomTrudnosci1", 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 2. Poziom trudności ${localStorage.getItem(
    "historiaPoziomTrudnosci1"
  )}, wynik ${localStorage.getItem("historiaWynik1")}/${localStorage.getItem(
    "historiaMaxWynik1"
  )} <br><br>`;
}

if (
  localStorage.getItem("historiaPoziomTrudnosci2") === null ||
  localStorage.getItem("historiaPoziomTrudnosci2") > 8
) {
  localStorage.setItem("historiaPoziomTrudnosci2", 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 3. Poziom trudności ${localStorage.getItem(
    "historiaPoziomTrudnosci2"
  )}, wynik ${localStorage.getItem("historiaWynik2")}/${localStorage.getItem(
    "historiaMaxWynik2"
  )} <br><br>`;
}

if (
  localStorage.getItem("historiaPoziomTrudnosci3") === null ||
  localStorage.getItem("historiaPoziomTrudnosci3") > 8
) {
  localStorage.setItem("historiaPoziomTrudnosci3", 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 4. Poziom trudności ${localStorage.getItem(
    "historiaPoziomTrudnosci3"
  )}, wynik ${localStorage.getItem("historiaWynik3")}/${localStorage.getItem(
    "historiaMaxWynik3"
  )} <br><br>`;
}

if (
  localStorage.getItem("historiaPoziomTrudnosci4") === null ||
  localStorage.getItem("historiaPoziomTrudnosci4") > 8
) {
  localStorage.setItem("historiaPoziomTrudnosci4", 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 5. Poziom trudności ${localStorage.getItem(
    "historiaPoziomTrudnosci4"
  )}, wynik ${localStorage.getItem("historiaWynik4")}/${localStorage.getItem(
    "historiaMaxWynik4"
  )} <br><br>`;
}

ostatnieWyniki.innerHTML = historiaWynikow;

//
//
// Modal popup
const body = document.querySelector("body");
const main = document.querySelector(".main");
const menuGlowne = document.querySelector(".menuGlowne");
const przycisk3linieOrazX = document.querySelector("#przycisk3linieOrazX");
const imglogo = document.querySelector("#imglogo");

const btnmodalAll = document.querySelectorAll(".btnmodal");
const modalBg = document.querySelector(".modal-bg");
const modalCloseAll = document.querySelectorAll(".modal-close");

const modalLewy = document.querySelector("#lewyPrzycisk");
const modalSrodkowyPrzycisk1 = document.querySelector("#srodkowyPrzycisk1");
const modalSrodkowyPrzycisk2 = document.querySelector("#srodkowyPrzycisk2");
const modalPrawy = document.querySelector("#prawyPrzycisk");

const modalMistrz = document.querySelector(".modalmistrz");
const modalmZasady = document.querySelector(".modalzasady");
const modalWyniki = document.querySelector(".modalwyniki");
const modalUstawienia = document.querySelector(".modalustawienia");

const modalBgMistrz = document.querySelector(".modal-bg-mistrz");
const modalBgZasady = document.querySelector(".modal-bg-zasady");
const modalBgWyniki = document.querySelector(".modal-bg-wyniki");
const modalBgUstawienia = document.querySelector(".modal-bg-ustawienia");

const lewyPrzyciskMobile = document.querySelector("#lewyPrzyciskMobile");
const srodkowyPrzycisk1Mobile = document.querySelector(
  "#srodkowyPrzycisk1Mobile"
);
const srodkowyPrzycisk2Mobile = document.querySelector(
  "#srodkowyPrzycisk2Mobile"
);
const prawyPrzyciskMobile = document.querySelector("#prawyPrzyciskMobile");

const lewyPrzycisk = document.querySelector(".lewyPrzycisk");
const srodkowyPrzycisk1 = document.querySelector(".srodkowyPrzycisk1");
const srodkowyPrzycisk2 = document.querySelector(".srodkowyPrzycisk2");
const prawyPrzycisk = document.querySelector(".prawyPrzycisk");

//Zamkniecie modala
modalCloseAll.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalBg.classList.remove("modal-bg-active");
    modalBgMistrz.classList.remove("modal-bg-active");
    modalBgZasady.classList.remove("modal-bg-active");
    modalBgWyniki.classList.remove("modal-bg-active");
    modalBgUstawienia.classList.remove("modal-bg-active");

    przyciskStart.style.border = "1px solid wheat";
    przyciskWynik.style.border = "1px solid wheat";
  });
});

//Otwarcie modala
modalLewy.addEventListener("click", () => {
  modalBgMistrz.classList.add("modal-bg-active");
  przyciskStart.style.border = "1px solid black";
  przyciskWynik.style.border = "1px solid black";
});

modalSrodkowyPrzycisk1.addEventListener("click", () => {
  modalBgZasady.classList.add("modal-bg-active");
  przyciskStart.style.border = "1px solid black";
  przyciskWynik.style.border = "1px solid black";
});

modalSrodkowyPrzycisk2.addEventListener("click", () => {
  modalBgWyniki.classList.add("modal-bg-active");
  przyciskStart.style.border = "1px solid black";
  przyciskWynik.style.border = "1px solid black";
});

modalPrawy.addEventListener("click", () => {
  modalBgUstawienia.classList.add("modal-bg-active");
  przyciskStart.style.border = "1px solid black";
  przyciskWynik.style.border = "1px solid black";
});

//Odczytanie poziom trudności z ustawień
inputPoziomTrudnosci.addEventListener("change", () => {
  poziomTrudnosci = Number(inputPoziomTrudnosci.value);
  if (poziomTrudnosci > 8) {
    poziomTrudnosci = 8;
  }

  if (poziomTrudnosci < 1) {
    poziomTrudnosci = 1;
  }
});

//Odczytanie opcji kolorów z ustawień
const inputKoloryLiter = document.querySelector("#inputKoloryLiter");

inputKoloryLiter.addEventListener("change", (e) => {
  if (inputKoloryLiter.checked) {
    poziomKoloryAktywny = true;
    inputKoloryLiter.checked = true;
    localStorage.setItem("aktywneKolory", "1");
  }

  if (!inputKoloryLiter.checked) {
    poziomKoloryAktywny = false;
    inputKoloryLiter.checked = false;
    localStorage.setItem("aktywneKolory", "0");
  }
});

//Funkcja zmiany tla
const zmianaNaBialeTlo = () => {
  body.style = "background:rgb(235,235,235)";
  main.style = "background:rgb(235,235,235)";
  menuGlowne.style = "background:rgb(235,235,235)";

  lewyPrzycisk.classList.add("prawyPrzyciskWhite");
  srodkowyPrzycisk1.classList.add("prawyPrzyciskWhite");
  srodkowyPrzycisk2.classList.add("prawyPrzyciskWhite");
  prawyPrzycisk.classList.add("prawyPrzyciskWhite");

  lewyPrzyciskMobile.classList.add("mobileWidocznoscWhite");
  srodkowyPrzycisk1Mobile.classList.add("mobileWidocznoscWhite");
  srodkowyPrzycisk2Mobile.classList.add("mobileWidocznoscWhite");
  prawyPrzyciskMobile.classList.add("mobileWidocznoscWhite");

  przycisk3linieOrazX.style.background = "rgb(235,235,235)";
  imglogo.src = "/mozg.png";

  const divNavAll = document.querySelectorAll(".nav");
  divNavAll.forEach((nav) => {
    nav.classList.add("navwhite");
  });

  const divPoleAll = document.querySelectorAll(".pole");
  divPoleAll.forEach((pole) => {
    pole.classList.add("polewhite");
  });

  const buttonstart = document.querySelector(".start");
  buttonstart.classList.add("startwhite");

  const buttonwynik = document.querySelector(".wynik");
  buttonwynik.classList.add("wynikwhite");

  const buttonpozycja = document.querySelector(".pozycja");
  buttonpozycja.classList.add("pozycjawhite");

  const buttonlitera = document.querySelector(".litera");
  buttonlitera.classList.add("literawhite");

  const buttonkolor = document.querySelector(".kolor");
  buttonkolor.classList.add("kolorwhite");

  inputKolorTla.checked = true;

  modalBgMistrz.classList.add("modal-bg-mistrz-white");

  modalBgZasady.classList.add("modal-bg-zasady-white");

  modalBgWyniki.classList.add("modal-bg-wyniki-white");

  modalBgUstawienia.classList.add("modal-bg-ustawienia-white");
};

//Odczytanie tla z ustawień
const inputKolorTla = document.querySelector("#inputKolorTla");

//Włączenie białego tła
inputKolorTla.addEventListener("change", (e) => {
  if (inputKolorTla.checked) {
    localStorage.setItem("tloBiale", "1");
    zmianaNaBialeTlo();
  }
  //Wyłączenie białego tła
  if (!inputKolorTla.checked) {
    inputKolorTla.checked = false;
    localStorage.setItem("tloBiale", "0");

    body.style = "background:rgb(24, 24, 24)";
    main.style = "background:rgb(24, 24, 24)";
    menuGlowne.style = "background:rgb(24, 24, 24)";

    przycisk3linieOrazX.style.background = "rgb(24, 24, 24)";
    imglogo.src = "http://jedrek90.47.pl/mistrzpamieci/mozg3.png";

    lewyPrzycisk.classList.remove("prawyPrzyciskWhite");
    srodkowyPrzycisk1.classList.remove("prawyPrzyciskWhite");
    srodkowyPrzycisk2.classList.remove("prawyPrzyciskWhite");
    prawyPrzycisk.classList.remove("prawyPrzyciskWhite");

    lewyPrzyciskMobile.classList.remove("mobileWidocznoscWhite");
    srodkowyPrzycisk1Mobile.classList.remove("mobileWidocznoscWhite");
    srodkowyPrzycisk2Mobile.classList.remove("mobileWidocznoscWhite");
    prawyPrzyciskMobile.classList.remove("mobileWidocznoscWhite");

    const divNavAll = document.querySelectorAll(".nav");
    divNavAll.forEach((nav) => {
      nav.classList.remove("navwhite");
    });

    const divPoleAll = document.querySelectorAll(".pole");
    divPoleAll.forEach((pole) => {
      pole.classList.remove("polewhite");
    });

    const buttonstart = document.querySelector(".start");
    buttonstart.classList.remove("startwhite");

    const buttonwynik = document.querySelector(".wynik");
    buttonwynik.classList.remove("wynikwhite");

    const buttonpozycja = document.querySelector(".pozycja");
    buttonpozycja.classList.remove("pozycjawhite");

    const buttonlitera = document.querySelector(".litera");
    buttonlitera.classList.remove("literawhite");

    const buttonkolor = document.querySelector(".kolor");
    buttonkolor.classList.remove("kolorwhite");
  }
});

//local Storage
window.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage);
  if (localStorage.getItem("tloBiale") == "1") {
    zmianaNaBialeTlo();
  }
  if (localStorage.getItem("aktywneKolory") == "1") {
    inputKoloryLiter.checked = true;
  }
});

//Hamburger menu
const linia1 = document.querySelector(".linia1");
const linia2 = document.querySelector(".linia2");
const linia3 = document.querySelector(".linia3");
const logo1 = document.querySelector(".logo1");
const logo2 = document.querySelector(".logo2");

przycisk3linieOrazX.addEventListener("click", () => {
  przycisk3linieOrazX.classList.toggle("zmiana3liniiNaX");
  body.classList.toggle("bodyoverflow");
  main.classList.toggle("mainWidocznosc");
  menuGlowne.classList.toggle("menuGlowneMobile");

  przycisk3linieOrazX.classList.toggle("przycisk3linieOrazXCzerwony");
  logo1.classList.toggle("logo1Widocznosc");
  logo2.classList.toggle("logo2Widocznosc");

  lewyPrzyciskMobile.classList.toggle("lewyPrzyciskWidocznosc");
  srodkowyPrzycisk1Mobile.classList.toggle("srodkowyPrzycisk1Widocznosc");
  srodkowyPrzycisk2Mobile.classList.toggle("srodkowyPrzycisk2Widocznosc");
  prawyPrzyciskMobile.classList.toggle("prawyPrzyciskWidocznosc");
});
