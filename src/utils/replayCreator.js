export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/04.json");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getMarks = (data) => {
  const marks = {
    [data.end]: "End",
  };

  return marks;
};

const setPose = (player, event) => {
  player.pose.push({
    tick: event.tick,
    pos: event.pos,
    yaw: event.yaw,
  });
};

const setStatus = (player, event) => {
  const status = player.status[player.status.length - 1];
  const { id, pos, yaw, ...eventStatus } = event;
  const newStatus = { ...status, ...eventStatus };
  player.status.push(id !== 3 ? newStatus : { tick: event.tick });
};

const eventSpawn = (player, event) => {
  const { id, tick, side, pos, yaw, ...status } = event;
  player.side = side;

  player.pose.push({
    tick: tick,
    pos: pos,
    yaw: yaw,
  });

  player.status.push({
    tick: tick,
    ...status,
  });
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

export const createReplayData = async (setData, setLastTick, setMarks) => {
  const data = await fetchData();
  if (!data) return;

  setLastTick(() => data.last);
  setMarks(() => getMarks(data));

  const players = [];
  const deaths = [];
  const shots = {};

  Object.entries(data.players).forEach(([plId, pl]) => {
    const player = {
      name: pl.name,
      pose: [],
      status: [],
    };

    pl.events.forEach((event) => {
      switch (event.id) {
        case 0:
          eventSpawn(player, event);
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
        default:
      }
    });
    players.push(player);
  });

  const grenades = [];

  Object.entries(data.grenades).forEach(([gndId, gnd]) => {
    let grenade;

    gnd.events.forEach((event, idx) => {
      switch (event.id) {
        case 0:
          if (idx > 0) grenades.push(grenade);
          grenade = { type: event.type, pose: [] };
          grenade.pose.push({
            tick: event.tick,
            pos: event.pos,
          });
          return;
        case 1:
          grenade.pose.push({
            tick: event.tick,
            pos: event.pos,
          });
      }
    });
    grenades.push(grenade);
  });

  setData(() => ({ players, deaths, shots, grenades }));
};
