# Projekt testowy serwera http z wykorzystaniem Express

## Uruchomienie aplikacji
node site/app.js

## Uruchomienie aplikacji w klastrze aplikacji
node site/cluster.js

## Przeprowadzenie testów w aplikacji
npm test

## Przeprowadzenie oszacowania pokrycia testami kodu
npm test -- --coverage

## Analiza statyczna kodu
npm run lint

## Zależności aplikacji
1. body-parser     - analiza danych zapytań POST z formularzy html
2. cookie-parser   - analiza danych cookies
3. express         - serwer http
4. express-session - dostęp do obsługi sesji dla express
5. mongoose        - klient bazy danych MongoDB
6. morgan          - agent logów - możliwość wyświetlania na konsoli w środowisku dev / zrzutu do pliku w środowisku prod
7. eslint          - analizator statyczny kodu js
8. jest            - framework do testów jednostkowych


## Linki
1. https://preshing.com/20110811/xkcd-password-generator/
