const przyciskStart = document.querySelector(".start");
const przyciskWynik = document.querySelector(".wynik");
let poziomTrudnosci = 2;

przyciskStart.addEventListener("click", () => {
  przyciskStart.style.display = "none";
  przyciskWynik.style.display = "none";
  const wszystkie_pola = document.querySelectorAll(".pole");
  const bazaOdpowiedzi = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  let wynik_tury = 0;
  let dlugoscTury = 0;

  let dlugoscGry = 5 + poziomTrudnosci;
  let zezwolenieKliknieciaCzlowieka = false;

  // jeżeli jest poziom trudnosci trzy to sprawdzam co było pokazane 3 klikniecia temu  Czyli wyswietlanie idzie caly czas w tempie 1 sek on 1 sek off

  //Koniec całej kolejki pięciu tur
  const zmianaPoziomuTrudnosci = () => {
    console.log("Zmiana poziomu trudności");
    console.log(
      `Zakończyłem poziom ${poziomTrudnosci} z wynikiem ${wynik_tury} poprawnych odpowiedzi`
    );
    if (wynik_tury === 0 || wynik_tury === 1) {
      poziomTrudnosci -= 1;
    } else if (wynik_tury === dlugoscGry - 1 || wynik_tury === dlugoscGry) {
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
  };

  //Zwraca array listę pól w danej turze w zaleznosci od poziomu trudnosci
  const losowePola = () => {
    let losoweLiczby = [];
    console.log("zaczynam", poziomTrudnosci);
    for (let i = 0; i < dlugoscGry; i++) {
      losoweLiczby.push(Math.floor(Math.random() * 16));
    }
    console.log(losoweLiczby);
    return losoweLiczby;
  };

  let wynikiJednejKolejki = losowePola();

  const losoweOdpowiedzi = () => {
    let odpowiedzi = [];
    for (let i = 0; i < dlugoscGry; i++) {
      odpowiedzi.push(bazaOdpowiedzi[Math.floor(Math.random() * 9)]);
    }
    console.log(odpowiedzi);
    return odpowiedzi;
  };
  let wynikiOdpowiedzi = losoweOdpowiedzi();

  //Tura Komputera
  const turaKomputera = () => {
    console.log("Start tury komputera nr", dlugoscTury);
    zezwolenieKliknieciaCzlowieka = false;
    //Podświetlanie wybranych pól na planszy
    const podwietlaniePol = () => {
      let time = 0;

      let interval = setInterval(function () {
        if (time < 1) {
          pojawianiePola(wszystkie_pola[wynikiJednejKolejki[dlugoscTury]]);
          wszystkie_pola[wynikiJednejKolejki[dlugoscTury]].innerHTML =
            wynikiOdpowiedzi[dlugoscTury];
          znikaniePola(wszystkie_pola[wynikiJednejKolejki[dlugoscTury]]);
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

  wszystkie_pola.forEach((pole, i) => {
    pole.addEventListener("click", () => {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiKliknieciaCzlowieka.push(i);
        console.log(wynikiKliknieciaCzlowieka);
      }
    });
  });

  // Tura Człowieka
  const turaCzlowieka = () => {
    const klikniecieCzlowieka = () => {
      console.log("start tury człowieka");
      zezwolenieKliknieciaCzlowieka = true;
    };
    klikniecieCzlowieka();

    if (dlugoscTury < dlugoscGry - 1) {
      setTimeout(function () {
        // jeżeli użytkownik nie kliknie w daje turze, to dodajemy za niego undefined
        if (wynikiKliknieciaCzlowieka.length < dlugoscTury + 1) {
          wynikiKliknieciaCzlowieka.push(undefined);
        }
        //jeżeli użytkownik kliknie 2 razy w danej turze to zaliczamy tylko pierwsze kliknięcie
        if (wynikiKliknieciaCzlowieka.length > dlugoscTury + 1) {
          wynikiKliknieciaCzlowieka = wynikiKliknieciaCzlowieka.slice(
            0,
            dlugoscTury + 1
          );
        }
        dlugoscTury += 1;
        console.log("Odpowiedzi człowieka", wynikiKliknieciaCzlowieka);
        console.log("koniec tury człowieka");
        turaKomputera();
      }, 1000);
    } else if (dlugoscTury === dlugoscGry - 1) {
      setTimeout(function () {
        console.log("Koniec");
        console.log("Wynik komputera", wynikiJednejKolejki);

        wynikiKliknieciaCzlowieka = wynikiKliknieciaCzlowieka.slice(
          poziomTrudnosci - 1,
          wynikiKliknieciaCzlowieka.length
        );
        console.log("Wynik człowieka", wynikiKliknieciaCzlowieka);
        for (let i = 0; i < dlugoscTury + 1; i++) {
          if (wynikiJednejKolejki[i] === wynikiKliknieciaCzlowieka[i]) {
            wynik_tury += 1;
          }
        }
        console.log("Wynik tury", wynik_tury);

        przyciskWynik.innerHTML = `Wynik ${wynik_tury}/${dlugoscGry}`;
        zmianaPoziomuTrudnosci();
      }, 1000);
    }
  };
});
