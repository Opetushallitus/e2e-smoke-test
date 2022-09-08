#e2-e-smoke-test

Tässä repositorioissa sijaitsee erilaisia playwrightilla toteutettuja testejä, joita on tarkoitus ajaa vasten eri ympäristöjä.

Nämä testit voivat auttaa saamaan kiinni mm. ongelmia joissa palvelun A rajapintoja päivitetään, mutta asennuksen jälkeen palvelun B jokin rajapinta lakkaa toimimasta oikein palvelun A muutoksen takia.

## Installation

`npm install`

## Testing

Run tests for all the domains by executing `npm test`

Run tests against specific domain by executing `npm test:qa`
