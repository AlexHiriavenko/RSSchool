import * as fileds from "./nonogramsFiealds";
const { dinosaur, fortress, plane, goblet, skull } = fileds;
const { smiley, aerostat, cuppa, house, mouse } = fileds;
const { deer, rat, castle, duck, church } = fileds;

export const nonograms = {
  easy: [
    { name: "Dinosaur", matrix: dinosaur },
    { name: "Fortress", matrix: fortress },
    { name: "Plane", matrix: plane },
    { name: "Goblet", matrix: goblet },
    { name: "Skull", matrix: skull },
  ],
  medium: [
    { name: "House", matrix: house },
    { name: "Aerostat", matrix: aerostat },
    { name: "Cuppa", matrix: cuppa },
    { name: "Smiley", matrix: smiley },
    { name: "Mouse", matrix: mouse },
  ],
  hard: [
    { name: "Deer", matrix: deer },
    { name: "Rat", matrix: rat },
    { name: "Castle", matrix: castle },
    { name: "Duck", matrix: duck },
    { name: "Church", matrix: church },
  ],
};
