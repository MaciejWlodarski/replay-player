import {
  findSurroundingEventsBinary,
  findPreviousEventBinary,
} from "/src/utils/utils";

const setPose = (player, event) => {
  player.pose.push({
    tick: event.tick,
    pos: event.pos,
    yaw: event.yaw,
  });
};

const setStatus = (player, event) => {
  const { id, pos, yaw, ...eventStatus } = event;
  if (id === 3) {
    player.status.push({ tick: event.tick });
    return;
  }
  const status = player.status[player.status.length - 1];
  player.status.push({ ...status, ...eventStatus });
};

const eventSpawn = (event) => {
  const { id, tick, name, side, pos, yaw, ...status } = event;

  return {
    name,
    side,
    pose: [{ tick, pos, yaw }],
    status: [{ tick, ...status }],
    blindings: [],
    plants: [],
    defuses: [],
  };
};

const eventDeath = (player, event, deaths) => {
  deaths.push({
    tick: event.tick,
    pos: event.pos,
    side: player.side,
  });
};

const eventShot = (event, shots) => {
  if (!shots[event.tick]) {
    shots[event.tick] = [];
  }

  shots[event.tick].push({
    pos: event.pos,
    yaw: event.yaw,
  });
};

const eventDrop = (player, event) => {
  const status = player.status[player.status.length - 1];
  const { id, pos, yaw, ...eventStatus } = event;
  const newStatus = { ...status, ...eventStatus };

  const { prime, sec } = event;
  if (prime) {
    if (status.prime !== prime) return;
    newStatus.prime = null;
  }

  if (sec) {
    if (status.sec !== sec) return;
    newStatus.sec = null;
  }

  player.status.push(newStatus);
};

const eventBlind = (player, event) => {
  const { tick, time } = event;
  player.blindings.push({ tick, time });
};

const eventPlantStart = (player, event) => {
  const { tick } = event;
  player.plants.push({ tick, time: 200, planting: true });
};

const eventPlantAbort = (player, event) => {
  const { tick } = event;
  player.plants.push({ tick, time: 0, planting: false });
};

const eventDefuseStart = (player, event) => {
  const { tick, kit } = event;
  const time = kit ? 319 : 639;
  player.defuses.push({ tick, time, defusing: true });
};

const eventDefuseAbort = (player, event) => {
  const { tick } = event;
  player.defuses.push({ tick, time: 0, defusing: false });
};

export const getPlayerEvents = (data) => {
  const players = [];
  const deaths = [];
  const shots = {};

  Object.values(data.players).forEach((pl) => {
    let player = null;

    pl.events.forEach((event) => {
      switch (event.id) {
        case 0:
          if (player) players.push(player);
          player = eventSpawn(event);
          break;
        case 1:
          setPose(player, event);
          break;
        case 2:
          setStatus(player, event);
          break;
        case 3:
          setPose(player, event);
          setStatus(player, event);
          eventDeath(player, event, deaths);
          break;
        case 4:
          setPose(player, event);
          setStatus(player, event);
          eventShot(event, shots);
          break;
        case 5:
          eventDrop(player, event);
          break;
        case 6:
          eventBlind(player, event);
          break;
        case 7:
          eventPlantStart(player, event);
          break;
        case 8:
          eventPlantAbort(player, event);
          break;
        case 9:
          eventDefuseStart(player, event);
          break;
        case 10:
          eventDefuseAbort(player, event);
          break;
        default:
          break;
      }
    });
    players.push(player);
  });

  return { players, deaths, shots };
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

export const getPlayerStatus = (player, targetTick) => {
  const status = findPreviousEventBinary(player.status, targetTick);
  return { ...status, tick: targetTick };
};

export const getPlayerBlindness = (player, targetTick) => {
  const blind = findPreviousEventBinary(player.blindings, targetTick);
  if (!blind) return 0;
  const blindness = blind.tick + blind.time - targetTick;
  if (blindness < 0) return 0;
  return blindness;
};

export const getPlayerPlantProgress = (player, targetTick) => {
  const plant = findPreviousEventBinary(player.plants, targetTick);
  if (!plant || !plant.planting) return 0;
  const plantState = plant.tick + plant.time - targetTick;
  if (plantState < 0) return 0;
  return (200 - plantState) / 200;
};

export const getPlayerDefuseProgress = (player, targetTick) => {
  const defuse = findPreviousEventBinary(player.defuses, targetTick);
  if (!defuse || !defuse.defusing) return 0;
  const defuseState = defuse.tick + defuse.time - targetTick;
  if (defuseState < 0) return 0;
  return (defuse.time - defuseState) / defuse.time;
};
