import Ancient from "./maps/de_ancient.svg?react";
import Anubis from "./maps/de_anubis.svg?react";
import Inferno from "./maps/de_inferno.svg?react";
import Mirage from "./maps/de_mirage.svg?react";
import Nuke from "./maps/de_nuke.svg?react";
import Vertigo from "./maps/de_vertigo.svg?react";
import Dust2 from "./maps/de_dust2.svg?react";

const maps = {
  de_ancient: {
    src: Ancient,
    start: { x: -2953, y: 2164 },
    lower: null,
    scale: 5,
  },
  de_anubis: {
    src: Anubis,
    start: { x: -2796, y: 3328 },
    lower: null,
    scale: 5.22,
  },
  de_inferno: {
    src: Inferno,
    start: { x: -2087, y: 3870 },
    lower: null,
    scale: 4.9,
  },
  de_mirage: {
    src: Mirage,
    start: { x: -3230, y: 1713 },
    lower: null,
    scale: 5,
  },
  de_nuke: {
    src: Nuke,
    start: { x: -3453, y: 2887 },
    lower: -495,
    scale: 7,
  },
  // de_overpass: {
  //   src: Overpass,
  //   start: { x: -4831, y: 1781 },
  //   lower: null,
  //   scale: 5.2,
  // },
  de_vertigo: {
    src: Vertigo,
    start: { x: -3168, y: 1762 },
    lower: 11700,
    scale: 4,
  },
  de_dust2: {
    src: Dust2,
    start: { x: -2476, y: 3239 },
    lower: null,
    scale: 4.4,
  },
};

export default maps;
