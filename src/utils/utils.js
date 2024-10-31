export const tickToTime = (tick) => {
  const seconds = Math.ceil(tick / 64);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const findSurroundingEventsBinary = (object, targetTick) => {
  if (targetTick < object.start || targetTick > object.end) return;

  const events = object.pose;
  let low = 0;
  let high = events.length - 1;

  if (targetTick <= events[low].tick) {
    return {
      start: null,
      end: events[low],
      index: 0,
    };
  }
  if (targetTick >= events[high].tick) {
    return {
      start: events[high],
      end: null,
      index: high,
    };
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (events[mid].tick === targetTick) {
      return {
        start: events[mid],
        end: events[mid],
        index: mid,
      };
    } else if (events[mid].tick < targetTick) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return {
    start: events[high],
    end: events[low],
    index: high,
  };
};

export const findPreviousEventBinary = (array, targetTick) => {
  if (!array.length) return null;

  let low = 0;
  let high = array.length - 1;

  if (targetTick < array[low].tick) {
    return null;
  }

  if (targetTick >= array[high].tick) {
    return array[high];
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid].tick === targetTick) {
      return array[mid];
    } else if (array[mid].tick < targetTick) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return array[high];
};

export const equipmentTypeMap = {
  1: "hkp2000",
  2: "glock",
  3: "p250",
  4: "deagle",
  5: "fiveseven",
  6: "elite",
  7: "tec9",
  8: "cz75a",
  9: "usp_silencer",
  10: "revolver",

  101: "mp7",
  102: "mp9",
  103: "bizon",
  104: "mac10",
  105: "ump45",
  106: "p90",
  107: "mp5",

  201: "sawedoff",
  202: "nova",
  203: "mag7",
  204: "xm1014",
  205: "m249",
  206: "negev",

  301: "galilar",
  302: "famas",
  303: "ak47",
  304: "m4a1",
  305: "m4a1_silencer",
  306: "ssg08",
  307: "sg556",
  308: "aug",
  309: "awp",
  310: "scar20",
  311: "g3sg1",
};

export const grenadeTypeMap = {
  501: "decoy",
  502: "molotov",
  503: "incgrenade",
  504: "flashbang",
  505: "smokegrenade",
  506: "hegrenade",
};

export const mapRange = (value, fromMin, fromMax, toMin, toMax) => {
  return toMin + ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin);
};

export const easeInOut = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const easeIn = (t) => {
  return t * t;
};

export const easeOut = (t) => {
  return t * (2 - t);
};

export const easeInCubic = (t) => {
  return t * t * t;
};

export const getTeam = (roundData, sideName) => {
  for (let i = 0; i < 2; i++) {
    const team = roundData.teams[i];
    if (sideName === team.side) return team;
  }
  return null;
};

export const getStrokeDasharray = (circumference, progress) => {
  return `${circumference * progress} ${circumference * (1 - progress)}`;
};

export const getTeamFromBool = (val) => {
  return val ? "ct" : "t";
};

export const deserializeKillFlags = (flags) => {
  return {
    killerTeam: getTeamFromBool(!!(flags & (1 << 0))),
    victimTeam: getTeamFromBool(!!(flags & (1 << 1))),
    assisterTeam: getTeamFromBool(!!(flags & (1 << 2))),
    isHeadshot: !!(flags & (1 << 3)),
    wallbang: !!(flags & (1 << 4)),
    throughSmoke: !!(flags & (1 << 5)),
    noScope: !!(flags & (1 << 6)),
    inAir: !!(flags & (1 << 7)),
    assistedFlash: !!(flags & (1 << 8)),
    attackerBlind: !!(flags & (1 << 9)),
  };
};

export const colorMap = {
  white: "#ffffff",
  t: "#e7b42c",
  ct: "#1174ff",
  green: "#2ace66",
  red: "#e6322d",
  dark: "rgb(23, 23, 23)",
  background: "rgb(35, 35, 35)",
  check: "rgb(50, 50, 50)",
  hover: "rgb(73, 73, 73)",
  border: "rgb(133, 133, 133)",
};
