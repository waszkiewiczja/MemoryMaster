const przyciskStart = document.querySelector('.start');
const przyciskWynik = document.querySelector('.wynik');
const przyciskPozycja = document.querySelector('.pozycja');
const przyciskLitera = document.querySelector('.litera');
const przyciskKolor = document.querySelector('.kolor');
const inputPoziomTrudnosci = document.querySelector('#inputPoziomTrudnosci');
const ostatnieWyniki = document.querySelector('#ostatnieWyniki');
const logo1 = document.querySelector('.logo1');

let poziomTrudnosci = 2;
let poziomKoloryAktywny = false;

let wyniki = [];
let wynikiPoziomTrudnosci = [];
let wynikiMaxWynik = [];
let historiaWynikow = '';

// wyswietlanie historii wynikow
if (localStorage.getItem('historiaPoziomTrudnosci0') === null) {
  localStorage.setItem('historiaPoziomTrudnosci0', 9);
} else {
  historiaWynikow = `1. Poziom trudności ${localStorage.getItem(
    'historiaPoziomTrudnosci0'
  )}, wynik ${localStorage.getItem('historiaWynik0')}/${localStorage.getItem(
    'historiaMaxWynik0'
  )} <br><br>`;
}

if (
  localStorage.getItem('historiaPoziomTrudnosci1') === null ||
  localStorage.getItem('historiaPoziomTrudnosci1') > 8
) {
  localStorage.setItem('historiaPoziomTrudnosci1', 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 2. Poziom trudności ${localStorage.getItem(
    'historiaPoziomTrudnosci1'
  )}, wynik ${localStorage.getItem('historiaWynik1')}/${localStorage.getItem(
    'historiaMaxWynik1'
  )} <br><br>`;
}

if (
  localStorage.getItem('historiaPoziomTrudnosci2') === null ||
  localStorage.getItem('historiaPoziomTrudnosci2') > 8
) {
  localStorage.setItem('historiaPoziomTrudnosci2', 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 3. Poziom trudności ${localStorage.getItem(
    'historiaPoziomTrudnosci2'
  )}, wynik ${localStorage.getItem('historiaWynik2')}/${localStorage.getItem(
    'historiaMaxWynik2'
  )} <br><br>`;
}

if (
  localStorage.getItem('historiaPoziomTrudnosci3') === null ||
  localStorage.getItem('historiaPoziomTrudnosci3') > 8
) {
  localStorage.setItem('historiaPoziomTrudnosci3', 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 4. Poziom trudności ${localStorage.getItem(
    'historiaPoziomTrudnosci3'
  )}, wynik ${localStorage.getItem('historiaWynik3')}/${localStorage.getItem(
    'historiaMaxWynik3'
  )} <br><br>`;
}

if (
  localStorage.getItem('historiaPoziomTrudnosci4') === null ||
  localStorage.getItem('historiaPoziomTrudnosci4') > 8
) {
  localStorage.setItem('historiaPoziomTrudnosci4', 9);
} else {
  historiaWynikow = ` ${historiaWynikow} 5. Poziom trudności ${localStorage.getItem(
    'historiaPoziomTrudnosci4'
  )}, wynik ${localStorage.getItem('historiaWynik4')}/${localStorage.getItem(
    'historiaMaxWynik4'
  )} <br><br>`;
}

ostatnieWyniki.innerHTML = historiaWynikow;

przyciskStart.addEventListener('click', () => {
  przyciskStart.style.display = 'none';
  przyciskWynik.style.display = 'none';
  przyciskPozycja.style.display = 'block';
  przyciskLitera.style.display = 'block';

  if (localStorage.getItem('aktywneKolory') == '1') {
    przyciskKolor.style.display = 'block';
    if (window.innerWidth < 800) {
      przyciskPozycja.innerText = 'P';
      przyciskLitera.innerText = 'L';
      przyciskKolor.innerText = 'K';
    }
    if (window.innerWidth >= 800) {
      przyciskPozycja.innerText = 'Pozycja';
      przyciskLitera.innerText = 'Litera';
      przyciskKolor.innerText = 'Kolor';
    }
  }

  const wszystkie_pola = document.querySelectorAll('.pole');
  const bazalosoweLitery = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const bazalosoweKolory = [
    'red',
    'aqua',
    'chartreuse', //zielony
    'orange',
    'yellow', //zolty
    'grey',
    'orchid',
    'white',
  ];

  let wynik_tury = 0;
  let dlugoscTury = 0;

  let dlugoscGry = 4 + poziomTrudnosci * 3;
  let zezwolenieKliknieciaCzlowieka = false;

  // Trudnosc 2 lub 3
  let lvlTrudnosci;
  if (poziomKoloryAktywny == true) {
    lvlTrudnosci = 3;
  } else if (poziomKoloryAktywny == false) {
    lvlTrudnosci = 2;
  }

  //Koniec całej tury
  const zmianaPoziomuTrudnosci = () => {
    console.log('Zmiana poziomu trudności');
    console.log(
      `Zakończyłem poziom ${poziomTrudnosci} z wynikiem ${wynik_tury} poprawnych odpowiedzi`
    );

    //Obliczanie wyniku i następnego poziomu trudnosci
    if (wynik_tury === 0 || wynik_tury === 1) {
      poziomTrudnosci -= 1;
    } else if (
      wynik_tury === liczbaPoprawnychOdpowiedzi - 1 ||
      wynik_tury === liczbaPoprawnychOdpowiedzi
    ) {
      poziomTrudnosci += 1;
    } else {
      poziomTrudnosci = poziomTrudnosci;
    }

    if (poziomTrudnosci <= 1) {
      poziomTrudnosci = 1;
    }

    if (poziomTrudnosci >= 8) {
      poziomTrudnosci = 8;
    }
    inputPoziomTrudnosci.value = poziomTrudnosci;

    console.log('Nowy poziom trudnosci', poziomTrudnosci);
    logo1.innerHTML = `${poziomTrudnosci}`;
    nowyStart();
  };

  const nowyStart = () => {
    przyciskStart.style.display = 'block';
    przyciskWynik.style.display = 'block';
    przyciskPozycja.style.display = 'none';
    przyciskLitera.style.display = 'none';
    przyciskKolor.style.display = 'none';
  };

  let liczbaPoprawnychOdpowiedzi = 0;
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

    for (let i = 0; i < poprawnePozycjeKomputera.length; i++) {
      if (poprawnePozycjeKomputera[i]) {
        liczbaPoprawnychOdpowiedzi += 1;
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

    for (let i = 0; i < poprawneLiteryKomputera.length; i++) {
      if (poprawneLiteryKomputera[i]) {
        liczbaPoprawnychOdpowiedzi += 1;
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

    if (poziomKoloryAktywny) {
      for (let i = 0; i < poprawneKoloryKomputera.length; i++) {
        if (poprawneKoloryKomputera[i]) {
          liczbaPoprawnychOdpowiedzi += 1;
        }
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
    console.log('Start tury komputera nr', dlugoscTury);
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
    const pojawianiePola = (pole) => {};

    //Animacja znikania pola
    const znikaniePola = (pole) => {
      setTimeout(function () {
        pole.innerHTML = '';
      }, 1000);
    };
  };
  turaKomputera();

  let wynikiKliknieciaCzlowieka = [];
  let wynikiPozcyjiCzlowieka = [];
  let wynikiLiteryCzlowieka = [];
  let wynikiKoloryCzlowieka = [];

  przyciskPozycja.addEventListener('click', () => {
    if (zezwolenieKliknieciaCzlowieka === true) {
      wynikiPozcyjiCzlowieka.push(aktywnaPozycja);
      console.log('klik pozycji');
    }
  });

  window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiPozcyjiCzlowieka.push(aktywnaPozycja);
        console.log('klik pozycji');
      }
    }

    if (e.key === 's' || e.key === 'ArrowDown') {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiLiteryCzlowieka.push(aktywnaLitera);
        console.log('klik litery');
      }
    }

    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (zezwolenieKliknieciaCzlowieka === true) {
        wynikiKoloryCzlowieka.push(aktywnyKolor);
        console.log('klik kolor');
      }
    }
  });

  przyciskLitera.addEventListener('click', () => {
    if (zezwolenieKliknieciaCzlowieka === true) {
      wynikiLiteryCzlowieka.push(aktywnaLitera);
      console.log('klik litery');
    }
  });

  przyciskKolor.addEventListener('click', () => {
    if (zezwolenieKliknieciaCzlowieka === true) {
      wynikiKoloryCzlowieka.push(aktywnyKolor);
      console.log('klik kolor');
    }
  });

  // Tura Człowieka
  const turaCzlowieka = () => {
    const klikniecieCzlowieka = () => {
      console.log('start tury człowieka');
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

        // jeżeli użytkownik nie kliknie w daje turze, to dodajemy za niego undefined
        if (wynikiKoloryCzlowieka.length < dlugoscTury + 1) {
          wynikiKoloryCzlowieka.push(undefined);
        }
        //jeżeli użytkownik kliknie 2 razy w danej turze to zaliczamy tylko pierwsze kliknięcie
        if (wynikiKoloryCzlowieka.length > dlugoscTury + 1) {
          wynikiKoloryCzlowieka = wynikiKoloryCzlowieka.slice(
            0,
            dlugoscTury + 1
          );
        }

        console.log('koniec tury człowieka');
        if (dlugoscTury < dlugoscGry - 1) {
          dlugoscTury += 1;
          turaKomputera();
        }
      }, 1000);
    }

    //Ostatnia tura gry
    if (dlugoscTury === dlugoscGry - 1) {
      setTimeout(function () {
        console.log('Koniec gry');
        console.log(
          'Wynik komputera',
          poprawnePozycjeKomputera,
          poprawneLiteryKomputera,
          poprawneKoloryKomputera
        );

        wynikiKliknieciaCzlowieka = wynikiKliknieciaCzlowieka.slice(
          poziomTrudnosci - 1,
          wynikiKliknieciaCzlowieka.length
        );
        console.log(
          'Wynik człowieka',
          wynikiPozcyjiCzlowieka,
          wynikiLiteryCzlowieka,
          wynikiKoloryCzlowieka
        );

        //Sprawdzanie wyniku gry
        for (let i = 0; i <= dlugoscTury + 1; i++) {
          if (poprawnePozycjeKomputera[i] == wynikiPozcyjiCzlowieka[i]) {
            if (poprawnePozycjeKomputera[i] !== undefined) {
              wynik_tury += 1;
            }
          }

          if (poprawneLiteryKomputera[i] == wynikiLiteryCzlowieka[i]) {
            if (poprawneLiteryKomputera[i] !== undefined) {
              wynik_tury += 1;
            }
          }
          if (aktywnyKolor === true) {
            if (poprawneKoloryKomputera[i] == wynikiKoloryCzlowieka[i]) {
              if (poprawneKoloryKomputera[i] !== undefined) {
                wynik_tury += 1;
              }
            }
          }
        }
        console.log('Wynik tury', wynik_tury);

        if (wyniki.length >= 10) {
          wyniki = wyniki.slice(0, 9);
          wynikiPoziomTrudnosci = wynikiPoziomTrudnosci.slice(0, 9);
          wynikiMaxWynik = wynikiMaxWynik.slice(0, 9);
        }
        wyniki.unshift(wynik_tury);

        wynikiPoziomTrudnosci.unshift(poziomTrudnosci);

        wynikiMaxWynik.unshift(liczbaPoprawnychOdpowiedzi);

        //let historiaWynikow = "";

        //Ustawianie local storage
        let historiaPT0 = localStorage.getItem('historiaPoziomTrudnosci0');
        let historiaPT1 = localStorage.getItem('historiaPoziomTrudnosci1');
        let historiaPT2 = localStorage.getItem('historiaPoziomTrudnosci2');
        let historiaPT3 = localStorage.getItem('historiaPoziomTrudnosci3');
        let historiaPT4 = localStorage.getItem('historiaPoziomTrudnosci4');

        localStorage.setItem('historiaPoziomTrudnosci0', poziomTrudnosci);
        localStorage.setItem('historiaPoziomTrudnosci1', historiaPT0);
        localStorage.setItem('historiaPoziomTrudnosci2', historiaPT1);
        localStorage.setItem('historiaPoziomTrudnosci3', historiaPT2);
        localStorage.setItem('historiaPoziomTrudnosci4', historiaPT3);

        let historiaW0 = localStorage.getItem('historiaWynik0');
        let historiaW1 = localStorage.getItem('historiaWynik1');
        let historiaW2 = localStorage.getItem('historiaWynik2');
        let historiaW3 = localStorage.getItem('historiaWynik3');
        let historiaW4 = localStorage.getItem('historiaWynik4');

        localStorage.setItem('historiaWynik0', wynik_tury);
        localStorage.setItem('historiaWynik1', historiaW0);
        localStorage.setItem('historiaWynik2', historiaW1);
        localStorage.setItem('historiaWynik3', historiaW2);
        localStorage.setItem('historiaWynik4', historiaW3);

        let historiaMaxW0 = localStorage.getItem('historiaMaxWynik0');
        let historiaMaxW1 = localStorage.getItem('historiaMaxWynik1');
        let historiaMaxW2 = localStorage.getItem('historiaMaxWynik2');
        let historiaMaxW3 = localStorage.getItem('historiaMaxWynik3');
        let historiaMaxW4 = localStorage.getItem('historiaMaxWynik4');

        localStorage.setItem('historiaMaxWynik0', liczbaPoprawnychOdpowiedzi);
        localStorage.setItem('historiaMaxWynik1', historiaMaxW0);
        localStorage.setItem('historiaMaxWynik2', historiaMaxW1);
        localStorage.setItem('historiaMaxWynik3', historiaMaxW2);
        localStorage.setItem('historiaMaxWynik4', historiaMaxW3);

        let linia2 = '';

        console.log(Number(historiaPT0), Number(historiaPT0) < 9);
        if (Number(historiaPT0) < 9) {
          linia2 = `2. Poziom trudności ${historiaPT0}, wynik ${historiaW0}/${historiaMaxW0} <br><br>`;
        }

        let linia3 = '';
        if (historiaPT1 < 9) {
          linia3 = `3. Poziom trudności ${historiaPT1}, wynik ${historiaW1}/${historiaMaxW1} <br><br>`;
        }

        let linia4 = '';
        if (historiaPT2 < 9) {
          linia4 = `4. Poziom trudności ${historiaPT2}, wynik ${historiaW2}/${historiaMaxW2} <br><br>`;
        }

        let linia5 = '';
        if (historiaPT3 < 9) {
          linia5 = `5. Poziom trudności ${historiaPT3}, wynik ${historiaW3}/${historiaMaxW3} <br><br>`;
        }

        historiaWynikow = `
        1. Poziom trudności ${poziomTrudnosci}, wynik ${wynik_tury}/${liczbaPoprawnychOdpowiedzi} <br><br>
        ${linia2}
        ${linia3}
        ${linia4}
        ${linia5}
        `;

        ostatnieWyniki.innerHTML = historiaWynikow;

        przyciskWynik.innerHTML = `Wynik ${wynik_tury}/${liczbaPoprawnychOdpowiedzi}`;
        zmianaPoziomuTrudnosci();
      }, 1000);
    }
  };
});

//
//
// Modal popup
const body = document.querySelector('body');
const main = document.querySelector('.main');
const menuGlowne = document.querySelector('.menuGlowne');
const przycisk3linieOrazX = document.querySelector('#przycisk3linieOrazX');
const imglogo = document.querySelector('#imglogo');

const btnmodalAll = document.querySelectorAll('.btnmodal');
const modalBg = document.querySelector('.modal-bg');
const modalCloseAll = document.querySelectorAll('.modal-close');

const modalLewy = document.querySelector('#lewyPrzycisk');
const modalSrodkowyPrzycisk1 = document.querySelector('#srodkowyPrzycisk1');
const modalSrodkowyPrzycisk2 = document.querySelector('#srodkowyPrzycisk2');
const modalPrawy = document.querySelector('#prawyPrzycisk');

const modalMistrz = document.querySelector('.modalmistrz');
const modalmZasady = document.querySelector('.modalzasady');
const modalWyniki = document.querySelector('.modalwyniki');
const modalUstawienia = document.querySelector('.modalustawienia');

const modalBgMistrz = document.querySelector('.modal-bg-mistrz');
const modalBgZasady = document.querySelector('.modal-bg-zasady');
const modalBgWyniki = document.querySelector('.modal-bg-wyniki');
const modalBgUstawienia = document.querySelector('.modal-bg-ustawienia');

const lewyPrzyciskMobile = document.querySelector('#lewyPrzyciskMobile');
const srodkowyPrzycisk1Mobile = document.querySelector(
  '#srodkowyPrzycisk1Mobile'
);
const srodkowyPrzycisk2Mobile = document.querySelector(
  '#srodkowyPrzycisk2Mobile'
);
const prawyPrzyciskMobile = document.querySelector('#prawyPrzyciskMobile');

const lewyPrzycisk = document.querySelector('.lewyPrzycisk');
const srodkowyPrzycisk1 = document.querySelector('.srodkowyPrzycisk1');
const srodkowyPrzycisk2 = document.querySelector('.srodkowyPrzycisk2');
const prawyPrzycisk = document.querySelector('.prawyPrzycisk');

//Zamkniecie modala
modalCloseAll.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalBg.classList.remove('modal-bg-active');
    modalBgMistrz.classList.remove('modal-bg-active');
    modalBgZasady.classList.remove('modal-bg-active');
    modalBgWyniki.classList.remove('modal-bg-active');
    modalBgUstawienia.classList.remove('modal-bg-active');

    przyciskStart.style.border = '1px solid wheat';
    przyciskWynik.style.border = '1px solid wheat';
  });
});

//Otwarcie modala
modalLewy.addEventListener('click', () => {
  modalBgMistrz.classList.add('modal-bg-active');
  przyciskStart.style.border = '1px solid black';
  przyciskWynik.style.border = '1px solid black';
});

modalSrodkowyPrzycisk1.addEventListener('click', () => {
  modalBgZasady.classList.add('modal-bg-active');
  przyciskStart.style.border = '1px solid black';
  przyciskWynik.style.border = '1px solid black';
});

modalSrodkowyPrzycisk2.addEventListener('click', () => {
  modalBgWyniki.classList.add('modal-bg-active');
  przyciskStart.style.border = '1px solid black';
  przyciskWynik.style.border = '1px solid black';
});

modalPrawy.addEventListener('click', () => {
  modalBgUstawienia.classList.add('modal-bg-active');
  przyciskStart.style.border = '1px solid black';
  przyciskWynik.style.border = '1px solid black';
});

//Odczytanie poziom trudności z ustawień
inputPoziomTrudnosci.addEventListener('change', () => {
  poziomTrudnosci = Number(inputPoziomTrudnosci.value);
  if (poziomTrudnosci > 8) {
    poziomTrudnosci = 8;
  }

  if (poziomTrudnosci < 1) {
    poziomTrudnosci = 1;
  }
});

//Odczytanie opcji kolorów z ustawień
const inputKoloryLiter = document.querySelector('#inputKoloryLiter');

inputKoloryLiter.addEventListener('change', (e) => {
  if (inputKoloryLiter.checked) {
    poziomKoloryAktywny = true;
    inputKoloryLiter.checked = true;
    localStorage.setItem('aktywneKolory', '1');
  }

  if (!inputKoloryLiter.checked) {
    poziomKoloryAktywny = false;
    inputKoloryLiter.checked = false;
    localStorage.setItem('aktywneKolory', '0');
  }
});

//Funkcja zmiany tla
const zmianaNaBialeTlo = () => {
  body.style = 'background:rgb(235,235,235)';
  main.style = 'background:rgb(235,235,235)';
  menuGlowne.style = 'background:rgb(235,235,235)';

  lewyPrzycisk.classList.add('prawyPrzyciskWhite');
  srodkowyPrzycisk1.classList.add('prawyPrzyciskWhite');
  srodkowyPrzycisk2.classList.add('prawyPrzyciskWhite');
  prawyPrzycisk.classList.add('prawyPrzyciskWhite');

  lewyPrzyciskMobile.classList.add('mobileWidocznoscWhite');
  srodkowyPrzycisk1Mobile.classList.add('mobileWidocznoscWhite');
  srodkowyPrzycisk2Mobile.classList.add('mobileWidocznoscWhite');
  prawyPrzyciskMobile.classList.add('mobileWidocznoscWhite');

  przycisk3linieOrazX.style.background = 'rgb(235,235,235)';
  imglogo.src = '/mozg.png';

  const divNavAll = document.querySelectorAll('.nav');
  divNavAll.forEach((nav) => {
    nav.classList.add('navwhite');
  });

  const divPoleAll = document.querySelectorAll('.pole');
  divPoleAll.forEach((pole) => {
    pole.classList.add('polewhite');
  });

  const buttonstart = document.querySelector('.start');
  buttonstart.classList.add('startwhite');

  const buttonwynik = document.querySelector('.wynik');
  buttonwynik.classList.add('wynikwhite');

  const buttonpozycja = document.querySelector('.pozycja');
  buttonpozycja.classList.add('pozycjawhite');

  const buttonlitera = document.querySelector('.litera');
  buttonlitera.classList.add('literawhite');

  const buttonkolor = document.querySelector('.kolor');
  buttonkolor.classList.add('kolorwhite');

  inputKolorTla.checked = true;

  modalBgMistrz.classList.add('modal-bg-mistrz-white');

  modalBgZasady.classList.add('modal-bg-zasady-white');

  modalBgWyniki.classList.add('modal-bg-wyniki-white');

  modalBgUstawienia.classList.add('modal-bg-ustawienia-white');
};

//Odczytanie tla z ustawień
const inputKolorTla = document.querySelector('#inputKolorTla');

//Włączenie białego tła
inputKolorTla.addEventListener('change', (e) => {
  if (inputKolorTla.checked) {
    localStorage.setItem('tloBiale', '1');
    zmianaNaBialeTlo();
  }
  //Wyłączenie białego tła
  if (!inputKolorTla.checked) {
    inputKolorTla.checked = false;
    localStorage.setItem('tloBiale', '0');

    body.style = 'background:rgb(24, 24, 24)';
    main.style = 'background:rgb(24, 24, 24)';
    menuGlowne.style = 'background:rgb(24, 24, 24)';

    przycisk3linieOrazX.style.background = 'rgb(24, 24, 24)';
    imglogo.src = 'http://jedrek90.47.pl/mistrzpamieci/mozg3.png';

    lewyPrzycisk.classList.remove('prawyPrzyciskWhite');
    srodkowyPrzycisk1.classList.remove('prawyPrzyciskWhite');
    srodkowyPrzycisk2.classList.remove('prawyPrzyciskWhite');
    prawyPrzycisk.classList.remove('prawyPrzyciskWhite');

    lewyPrzyciskMobile.classList.remove('mobileWidocznoscWhite');
    srodkowyPrzycisk1Mobile.classList.remove('mobileWidocznoscWhite');
    srodkowyPrzycisk2Mobile.classList.remove('mobileWidocznoscWhite');
    prawyPrzyciskMobile.classList.remove('mobileWidocznoscWhite');

    const divNavAll = document.querySelectorAll('.nav');
    divNavAll.forEach((nav) => {
      nav.classList.remove('navwhite');
    });

    const divPoleAll = document.querySelectorAll('.pole');
    divPoleAll.forEach((pole) => {
      pole.classList.remove('polewhite');
    });

    const buttonstart = document.querySelector('.start');
    buttonstart.classList.remove('startwhite');

    const buttonwynik = document.querySelector('.wynik');
    buttonwynik.classList.remove('wynikwhite');

    const buttonpozycja = document.querySelector('.pozycja');
    buttonpozycja.classList.remove('pozycjawhite');

    const buttonlitera = document.querySelector('.litera');
    buttonlitera.classList.remove('literawhite');

    const buttonkolor = document.querySelector('.kolor');
    buttonkolor.classList.remove('kolorwhite');
  }
});

//local Storage
window.addEventListener('DOMContentLoaded', () => {
  console.log(localStorage);
  if (localStorage.getItem('tloBiale') == '1') {
    zmianaNaBialeTlo();
  }
  if (localStorage.getItem('aktywneKolory') == '1') {
    inputKoloryLiter.checked = true;
  }
});

//Hamburger menu
const linia1 = document.querySelector('.linia1');
const linia2 = document.querySelector('.linia2');
const linia3 = document.querySelector('.linia3');
const logo2 = document.querySelector('.logo2');

logo1.innerHTML = `${poziomTrudnosci}`;

przycisk3linieOrazX.addEventListener('click', () => {
  przycisk3linieOrazX.classList.toggle('zmiana3liniiNaX');
  body.classList.toggle('bodyoverflow');
  main.classList.toggle('mainWidocznosc');
  menuGlowne.classList.toggle('menuGlowneMobile');

  przycisk3linieOrazX.classList.toggle('przycisk3linieOrazXCzerwony');
  logo1.classList.toggle('logo1Widocznosc');
  logo2.classList.toggle('logo2Widocznosc');

  lewyPrzyciskMobile.classList.toggle('lewyPrzyciskWidocznosc');
  srodkowyPrzycisk1Mobile.classList.toggle('srodkowyPrzycisk1Widocznosc');
  srodkowyPrzycisk2Mobile.classList.toggle('srodkowyPrzycisk2Widocznosc');
  prawyPrzyciskMobile.classList.toggle('prawyPrzyciskWidocznosc');
});
