export const tickToTime = (tick) => {
  const seconds = Math.round(tick / 64);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const findSurroundingEventsBinary = (object, targetTick) => {
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

export const getPlayerPose = (player, targetTick) => {
  const { start, end } = findSurroundingEventsBinary(player, targetTick);
  if (start === end) return start;
  if (!start) return end;
  if (!end) return start;

  const t = (targetTick - start.tick) / (end.tick - start.tick);

  const x = start.pos.x + t * (end.pos.x - start.pos.x);
  const y = start.pos.y + t * (end.pos.y - start.pos.y);
  const z = start.pos.z + t * (end.pos.z - start.pos.z);

  let yawDifference = end.yaw - start.yaw;
  if (yawDifference > 180) {
    yawDifference -= 360;
  } else if (yawDifference < -180) {
    yawDifference += 360;
  }

  const interpolatedYaw = start.yaw + yawDifference * t;

  let normalizedYaw = interpolatedYaw;
  if (normalizedYaw > 180) {
    normalizedYaw -= 360;
  } else if (normalizedYaw < -180) {
    normalizedYaw += 360;
  }

  return { tick: targetTick, pos: { x, y, z }, yaw: normalizedYaw };
};

const findPreviousEventBinary = (array, targetTick) => {
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

export const getPlayerStatus = (player, targetTick) => {
  const status = findPreviousEventBinary(player.status, targetTick);
  return { ...status, tick: targetTick };
};

export const getGrenadePose = (grenade, targetTick) => {
  const events = findSurroundingEventsBinary(grenade, targetTick);
  if (!events) return;

  let { start, end, index } = events;
  if (!start) {
    if (targetTick < end.tick) return;
    start = end;
  }
  if (!end) {
    if (targetTick > start.tick) return;
    end = start;
  }

  const t = (targetTick - start.tick) / (end.tick - start.tick || 1);

  const x = start.pos.x + t * (end.pos.x - start.pos.x);
  const y = start.pos.y + t * (end.pos.y - start.pos.y);
  const z = start.pos.z + t * (end.pos.z - start.pos.z);
  const pos = { x, y, z };

  const trajectory = grenade.pose.slice(0, index + 1).map((pose) => pose.pos);
  const lastPos = trajectory[trajectory.length - 1];
  if (lastPos.x !== pos.x || lastPos.y !== pos.y || lastPos.z !== pos.z) {
    trajectory.push(pos);
  }

  return { tick: targetTick, pos, trajectory };
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
