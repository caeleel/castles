[Example castle](https://www.madcastles.com/#+P2-2,6&-V0-24,4&-W0-14,10&-e0-14,8&-d0-14,0&+k0-10,-4&-f10,-6&-L30,-14&-C38,-12&+J18,2&+M24,6&+G08,6&-a22,10&+A0-4,14&-E112,-4&-N32,-6)

Score Validator for the board game [Castles of Mad King Ludwig](https://beziergames.com/collections/all-games/products/castles). After spending many hours playing this 2-4 player board game, we felt the need for an automated way to sum up castle points. Mad Castles lets you input your castle and tells you how many points it is worth.

## Install dependencies
```
brew install yarn # or install yarn some other way
yarn
```

## Running the dev server

Local dev server will watch local Typescript files and auto-compile when they change
```
yarn start
Visit localhost:8080
```

## Deployment

```
make deploy
```
