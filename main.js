const przyciskStart = document.querySelector(".start");
const przyciskWynik = document.querySelector(".wynik");
const przyciskPozycja = document.querySelector(".pozycja");
const przyciskLitera = document.querySelector(".litera");

let poziomTrudnosci = 2;
let poziomKoloryAktywny = false;

przyciskStart.addEventListener("click", () => {
  przyciskStart.style.display = "none";
  przyciskWynik.style.display = "none";
  przyciskPozycja.style.display = "block";
  przyciskLitera.style.display = "block";

  const wszystkie_pola = document.querySelectorAll(".pole");
  const bazalosoweLitery = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const bazalosoweKolory = [
    "red",
    "aqua",
    "chartreuse", //zielony
    "orange",
    "yellow", //zolty
    "grey",
    "orchid",
    "white",
  ];

  let wynik_tury = 0;
  let dlugoscTury = 0;

  let dlugoscGry = 4 + poziomTrudnosci * 2;
  let zezwolenieKliknieciaCzlowieka = false;

  //Koniec całej tury
  const zmianaPoziomuTrudnosci = () => {
    console.log("Zmiana poziomu trudności");
    console.log(
      `Zakończyłem poziom ${poziomTrudnosci} z wynikiem ${wynik_tury} poprawnych odpowiedzi`
    );
    if (wynik_tury / (dlugoscGry * 2) < 0.5) {
      poziomTrudnosci -= 1;
    } else if (
      wynik_tury === dlugoscGry * 2 - 1 ||
      wynik_tury === dlugoscGry * 2
    ) {
      poziomTrudnosci += 1;
    } else {
      poziomTrudnosci = poziomTrudnosci;
    }

    if (poziomTrudnosci <= 1) {
      poziomTrudnosci = 1;
    }

    if (poziomTrudnosci >= 9) {
      poziomTrudnosci = 9;
    }

    console.log("Nowy poziom trudnosci", poziomTrudnosci);
    nowyStart();
  };

  const nowyStart = () => {
    przyciskStart.style.display = "block";
    przyciskWynik.style.display = "block";
    przyciskPozycja.style.display = "none";
    przyciskLitera.style.display = "none";
  };

  let liczbaPoprawnychPozycji = 0;
  let liczbaPoprawnychLiter = 0;
  let liczbaPoprawnychKolorow = 0;

  let poprawnePozycjeKomputera = [];
  let poprawneLiteryKomputera = [];
  let poprawneKoloryKomputera = [];

  //Funckja zwraca array listę pozycji w danej turze w zaleznosci od poziomu trudnosci
  const losowePozycje = () => {
    let losoweLiczby = [];

    //Losuje listę pozycji w której wyświetlą się litery.
    const losowaniePozycji = () => {
      for (let i = 0; i < dlugoscGry; i++) {
        losoweLiczby.push(Math.floor(Math.random() * 9));
      }

      //Sprawdzam czy wylosowane pozycje zawierają conajmniej liczbę popawnych odpowiedzi równą poziomowi trudności.
      for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
        if (losoweLiczby[i] === losoweLiczby[i + poziomTrudnosci]) {
          liczbaPoprawnychPozycji += 1;
        }
      }
    };

    //Jak nie to losuje ponownie.
    while (liczbaPoprawnychPozycji < poziomTrudnosci) {
      losoweLiczby = [];
      poprawnePozycjeKomputera = [];
      liczbaPoprawnychPozycji = 0;
      losowaniePozycji();
    }
    //Tworze liste poprawnych odpowiedzi
    for (let j = 0; j < poziomTrudnosci; j++) {
      poprawnePozycjeKomputera.push(undefined);
    }
    for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
      if (losoweLiczby[i] === losoweLiczby[i + poziomTrudnosci]) {
        poprawnePozycjeKomputera.push(losoweLiczby[i + poziomTrudnosci]);
      } else {
        poprawnePozycjeKomputera.push(undefined);
      }
    }

    console.log(losoweLiczby);
    console.log(poprawnePozycjeKomputera);
    return losoweLiczby;
  };

  let wynikiPozycjiKomputera = losowePozycje();

  //
  //Zwraca array liste liter
  const losoweLitery = () => {
    let losoweLitery = [];

    //Losowanie listy liter
    const losowanieLiter = () => {
      for (let i = 0; i < dlugoscGry; i++) {
        losoweLitery.push(
          bazalosoweLitery[Math.floor(Math.random() * poziomTrudnosci)]
        );
      }

      //Sprawdzam czy wylosowane litery zawierają conajmniej liczbę popawnych odpowiedzi równą poziomowi trudności.
      for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
        if (losoweLitery[i] === losoweLitery[i + poziomTrudnosci]) {
          liczbaPoprawnychLiter += 1;
        }
      }
    };

    //Jak nie to losuje ponownie.
    while (liczbaPoprawnychLiter < poziomTrudnosci) {
      losoweLitery = [];
      poprawneLiteryKomputera = [];
      liczbaPoprawnychLiter = 0;
      losowanieLiter();
    }

    //Tworze liste poprawnych odpowiedzi
    for (let j = 0; j < poziomTrudnosci; j++) {
      poprawneLiteryKomputera.push(undefined);
    }
    for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
      if (losoweLitery[i] === losoweLitery[i + poziomTrudnosci]) {
        poprawneLiteryKomputera.push(losoweLitery[i + poziomTrudnosci]);
        liczbaPoprawnychLiter += 1;
      } else {
        poprawneLiteryKomputera.push(undefined);
      }
    }

    console.log(losoweLitery);
    console.log(poprawneLiteryKomputera);

    return losoweLitery;
  };
  let wynikiLiteryKomputera = losoweLitery();

  //
  //Zwraca array liste kolorów
  const losoweKolory = () => {
    let losoweKolory;

    //Losowanie listy koloró
    const losowanieKolorow = () => {
      for (let i = 0; i < dlugoscGry; i++) {
        losoweKolory.push(
          bazalosoweKolory[Math.floor(Math.random() * poziomTrudnosci)]
        );
      }

      //Sprawdzam czy wylosowane litery zawierają conajmniej liczbę popawnych odpowiedzi równą poziomowi trudności.
      for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
        if (losoweKolory[i] === losoweKolory[i + poziomTrudnosci]) {
          liczbaPoprawnychKolorow += 1;
        }
      }
    };

    //Jak nie to losuje ponownie.
    while (liczbaPoprawnychKolorow < poziomTrudnosci) {
      losoweKolory = [];
      poprawneKoloryKomputera = [];
      liczbaPoprawnychKolorow = 0;
      losowanieKolorow();
    }

    //Tworze liste poprawnych odpowiedzi
    for (let j = 0; j < poziomTrudnosci; j++) {
      poprawneKoloryKomputera.push(undefined);
    }
    for (let i = 0; i < dlugoscGry - poziomTrudnosci; i++) {
      if (losoweKolory[i] === losoweKolory[i + poziomTrudnosci]) {
        poprawneKoloryKomputera.push(losoweKolory[i + poziomTrudnosci]);
        liczbaPoprawnychKolorow += 1;
      } else {
        poprawneKoloryKomputera.push(undefined);
      }
    }

    console.log(losoweKolory);
    console.log(poprawneKoloryKomputera);

    return losoweKolory;
  };
  let wynikiKoloryKomputera = losoweKolory();

  let aktywnaPozycja;
  let aktywnaLitera;
  let aktywnyKolor;

  //Tura Komputera
  const turaKomputera = () => {
    console.log("Start tury komputera nr", dlugoscTury);
    zezwolenieKliknieciaCzlowieka = true;

    //Podświetlanie wybranych pól na planszy
    const podwietlaniePol = () => {
      let time = 0;

      let interval = setInterval(function () {
        if (time < 1) {
          aktywnaPozycja =
            wszystkie_pola[wynikiPozycjiKomputera[dlugoscTury]].id;
          aktywnaLitera = wynikiLiteryKomputera[dlugoscTury];
          aktywnyKolor = wynikiKoloryKomputera[dlugoscTury];
          pojawianiePola(wszystkie_pola[wynikiPozycjiKomputera[dlugoscTury]]);
          wszystkie_pola[wynikiPozycjiKomputera[dlugoscTury]].innerHTML =
            wynikiLiteryKomputera[dlugoscTury];
          if (poziomKoloryAktywny) {
            wszystkie_pola[
              wynikiPozycjiKomputera[dlugoscTury]
            ].style = `color:${wynikiKoloryKomputera[dlugoscTury]}`;
          }
          znikaniePola(wszystkie_pola[wynikiPozycjiKomputera[dlugoscTury]]);
          time++;
        } else {
          clearInterval(interval);
          turaCzlowieka();
        }
      }, 1200);
    };
    podwietlaniePol();

    // Animacja pojawiania pola
    const pojawianiePola = (pole) => {
      // pole.style.background = "white";
      // pole.style.transition = "0.5s ease";
    };

    //Animacja znikania pola
    const znikaniePola = (pole) => {
      setTimeout(function () {
        // pole.style.background = "#1d1d1d";
        pole.innerHTML = "";
      }, 1000);
    };
  };
  turaKomputera();

  let wynikiKliknieciaCzlowieka = [];
  let wynikiPozcyjiCzlowieka = [];
  let wynikiLiteryCzlowieka = [];

  przyciskPozycja.addEventListener("click", () => {
    if (zezwolenieKliknieciaCzlowieka === true) {
      wynikiPozcyjiCzlowieka.push(aktywnaPozycja);
      console.log("klik pozycji");
    }
  });

  window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "a" || e.key === "ArrowLeft") {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiPozcyjiCzlowieka.push(aktywnaPozycja);
        console.log("klik pozycji");
      }
    }

    if (e.key === "d" || e.key === "ArrowRight") {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiLiteryCzlowieka.push(aktywnaLitera);
        console.log("klik litery");
      }
    }
  });

  przyciskLitera.addEventListener("click", () => {
    if (zezwolenieKliknieciaCzlowieka === true) {
      wynikiLiteryCzlowieka.push(aktywnaLitera);
      console.log("klik litery");
    }
  });

  // Tura Człowieka
  const turaCzlowieka = () => {
    const klikniecieCzlowieka = () => {
      console.log("start tury człowieka");
      zezwolenieKliknieciaCzlowieka = true;
    };
    klikniecieCzlowieka();

    if (dlugoscTury <= dlugoscGry - 1) {
      setTimeout(function () {
        // jeżeli użytkownik nie kliknie w daje turze, to dodajemy za niego undefined
        if (wynikiLiteryCzlowieka.length < dlugoscTury + 1) {
          wynikiLiteryCzlowieka.push(undefined);
        }
        //jeżeli użytkownik kliknie 2 razy w danej turze to zaliczamy tylko pierwsze kliknięcie
        if (wynikiLiteryCzlowieka.length > dlugoscTury + 1) {
          wynikiLiteryCzlowieka = wynikiLiteryCzlowieka.slice(
            0,
            dlugoscTury + 1
          );
        }

        // jeżeli użytkownik nie kliknie w daje turze, to dodajemy za niego undefined
        if (wynikiPozcyjiCzlowieka.length < dlugoscTury + 1) {
          wynikiPozcyjiCzlowieka.push(undefined);
        }
        //jeżeli użytkownik kliknie 2 razy w danej turze to zaliczamy tylko pierwsze kliknięcie
        if (wynikiPozcyjiCzlowieka.length > dlugoscTury + 1) {
          wynikiPozcyjiCzlowieka = wynikiPozcyjiCzlowieka.slice(
            0,
            dlugoscTury + 1
          );
        }

        console.log("koniec tury człowieka");
        if (dlugoscTury < dlugoscGry - 1) {
          dlugoscTury += 1;
          turaKomputera();
        }
      }, 1000);
    }

    //Ostatnia tura gry
    if (dlugoscTury === dlugoscGry - 1) {
      setTimeout(function () {
        console.log("Koniec gry");
        console.log(
          "Wynik komputera",
          poprawnePozycjeKomputera,
          poprawneLiteryKomputera
        );

        wynikiKliknieciaCzlowieka = wynikiKliknieciaCzlowieka.slice(
          poziomTrudnosci - 1,
          wynikiKliknieciaCzlowieka.length
        );
        console.log(
          "Wynik człowieka",
          wynikiPozcyjiCzlowieka,
          wynikiLiteryCzlowieka
        );

        //Sprawdzanie wyniku gry
        for (let i = 0; i < dlugoscTury + 1; i++) {
          if (poprawnePozycjeKomputera[i] == wynikiPozcyjiCzlowieka[i]) {
            wynik_tury += 1;
          }
          if (poprawneLiteryKomputera[i] == wynikiLiteryCzlowieka[i]) {
            wynik_tury += 1;
          }
        }
        console.log("Wynik tury", wynik_tury);

        przyciskWynik.innerHTML = `Wynik ${wynik_tury}/${dlugoscGry * 2}`;
        zmianaPoziomuTrudnosci();
      }, 1000);
    }
  };
});

//
//
// Modal popup
const btnmodalAll = document.querySelectorAll(".btnmodal");
const modalBg = document.querySelector(".modal-bg");
const modalCloseAll = document.querySelectorAll(".modal-close");

const modalMistrz = document.querySelector(".modalmistrz");
const modalmZasady = document.querySelector(".modalzasady");
const modalUstawienia = document.querySelector(".modalustawienia");

const modalBgMistrz = document.querySelector(".modal-bg-mistrz");
const modalBgZasady = document.querySelector(".modal-bg-zasady");
const modalBgUstawienia = document.querySelector(".modal-bg-ustawienia");

btnmodalAll.forEach((btnmodal) => {
  btnmodal.addEventListener("click", () => {
    modalBg.classList.add("modal-bg-active");
  });
});

modalCloseAll.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalBg.classList.remove("modal-bg-active");
    modalBgMistrz.classList.remove("modal-bg-active");
    modalBgZasady.classList.remove("modal-bg-active");
    modalBgUstawienia.classList.remove("modal-bg-active");
  });
});

modalMistrz.addEventListener("click", () => {
  modalBgMistrz.classList.add("modal-bg-active");
});

modalmZasady.addEventListener("click", () => {
  modalBgZasady.classList.add("modal-bg-active");
});

modalUstawienia.addEventListener("click", () => {
  modalBgUstawienia.classList.add("modal-bg-active");
});

//Odczytanie poziom trudności z ustawień
const inputPoziomTrudnosci = document.querySelector("#inputPoziomTrudnosci");

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
  }
});
