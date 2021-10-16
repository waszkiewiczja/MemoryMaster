const przyciskStart = document.querySelector(".start");
const przyciskWynik = document.querySelector(".wynik");

przyciskStart.addEventListener("click", () => {
  przyciskStart.style.display = "none";
  przyciskWynik.style.display = "none";
  const wszystkie_pola = document.querySelectorAll(".pole");
  const bazaOdpowiedzi = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  let wynik_tury = 0;
  let dlugoscTury = 0;
  let poziomTrudnosci = 4;
  const dlugoscGry = 21;

  // jeżeli jest poziom trudnosci trzy to sprawdzam co było pokazane 3 klikniecia temu  Czyli wyswietlanie idzie caly czas w tempie 1 sek on 1 sek off

  //Koniec całej kolejki pięciu tur
  const zmianaPoziomuTrudnosci = () => {
    console.log("Zmiana poziomu trudności");
    console.log(
      `Zakończyłem poziom ${poziomTrudnosci} z wynikiem ${wynik_tury} poprawnych odpowiedzi`
    );
    if (wynik_tury === 0 || wynik_tury === 1) {
      poziomTrudnosci -= 1;
    } else if (wynik_tury === 4 || wynik_tury === 5) {
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
      losoweLiczby.push(Math.floor(Math.random() * 25));
    }
    return losoweLiczby;
  };

  let wynikiJednejKolejki = losowePola();

  const losoweOdpowiedzi = () => {
    let odpowiedzi = [];
    for (let i = 0; i < dlugoscGry; i++) {
      odpowiedzi.push(bazaOdpowiedzi[Math.floor(Math.random() * 9)]);
    }
    return odpowiedzi;
  };
  let wynikiOdpowiedzi = losoweOdpowiedzi();

  //Tura Komputera
  const turaKomputera = () => {
    //Podświetlanie wybranych pól na planszy
    const podwietlaniePol = () => {
      let time = 0;

      console.log(wynikiJednejKolejki);

      let interval = setInterval(function () {
        if (time < dlugoscGry) {
          pojawianiePola(wszystkie_pola[wynikiJednejKolejki[time]]);
          wszystkie_pola[wynikiJednejKolejki[time]].innerHTML =
            wynikiOdpowiedzi[time];
          znikaniePola(wszystkie_pola[wynikiJednejKolejki[time]]);
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

  // Tura Człowieka
  const turaCzlowieka = () => {
    const klikniecieCzlowieka = () => {
      console.log("start");
      let wynikiKliknieciaCzlowieka = [];
      wszystkie_pola.forEach((pole, i) => {
        pole.addEventListener("click", () => {
          wynikiKliknieciaCzlowieka.push(i);

          if (wynikiKliknieciaCzlowieka.length === poziomTrudnosci) {
            if (_.isEqual(wynikiJednejKolejki, wynikiKliknieciaCzlowieka)) {
              console.log("sukces");
              wynik_tury += 1;
              console.log(wynik_tury);
            } else {
              console.log("porazka");
            }
          }
        });
      });
    };
    klikniecieCzlowieka();
    const dlugoscOdpowiedzi = `${poziomTrudnosci - 1}500`;

    if (dlugoscTury < 21) {
      setTimeout(function () {
        console.log("Nowa tura", dlugoscTury);
        wynikiJednejKolejki = losowePola();
        wynikiOdpowiedzi = losoweOdpowiedzi();
        dlugoscTury += 1;
        turaKomputera();
      }, dlugoscOdpowiedzi);
    } else if (dlugoscTury === 21) {
      setTimeout(function () {
        console.log("Koniec");
        przyciskWynik.innerHTML = `Wynik ${wynik_tury}/5`;
        zmianaPoziomuTrudnosci();
      }, dlugoscOdpowiedzi);
    }
  };
});
