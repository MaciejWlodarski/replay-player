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
        default:
      }
    });
    players.push(player);
  });

  return { players, deaths, shots };
};
