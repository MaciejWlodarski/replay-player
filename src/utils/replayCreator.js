export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/18.json");
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
  const lastPoseTick = player.lastState.pose;

  const totalTicks = event.tick - lastPoseTick;
  const startPose = player.states[lastPoseTick].pose;

  const startPos = startPose.pos;
  const endPos = event.pos;

  const startYaw = startPose.yaw;
  const endYaw = event.yaw;

  let yawDifference = endYaw - startYaw;
  if (yawDifference > 180) {
    yawDifference -= 360;
  } else if (yawDifference < -180) {
    yawDifference += 360;
  }

  for (let t = 1; t <= totalTicks; t++) {
    const ratio = t / totalTicks;

    const interpolatedX = startPos.x + (endPos.x - startPos.x) * ratio;
    const interpolatedY = startPos.y + (endPos.y - startPos.y) * ratio;
    const interpolatedZ = startPos.z + (endPos.z - startPos.z) * ratio;

    const interpolatedYaw = startYaw + yawDifference * ratio;

    let normalizedYaw = interpolatedYaw;
    if (normalizedYaw > 180) {
      normalizedYaw -= 360;
    } else if (normalizedYaw < -180) {
      normalizedYaw += 360;
    }

    if (!player.states[lastPoseTick + t]) {
      player.states[lastPoseTick + t] = {};
    }

    player.states[lastPoseTick + t].pose = {
      pos: {
        x: interpolatedX,
        y: interpolatedY,
        z: interpolatedZ,
      },
      yaw: normalizedYaw,
    };
    player.lastState.pose = event.tick;
  }
};

const setStatus = (player, event) => {
  const lastStatusTick = player.lastState.status;

  const totalTicks = event.tick - lastStatusTick;
  const lastStatus = player.states[lastStatusTick].status;

  for (let t = 0; t <= totalTicks; t++) {
    if (!player.states[lastStatusTick + t]) {
      player.states[lastStatusTick + t] = {};
    }
    if (t < totalTicks) {
      player.states[lastStatusTick + t].status = { ...lastStatus };
    } else {
      const { tick, id, pos, yaw, ...newStatus } = event;
      const updatedStatus = { ...lastStatus, ...newStatus };
      if (id === 3) {
        updatedStatus.hp = 0;
        updatedStatus.armor = false;
        updatedStatus.helmet = false;
        updatedStatus.kit = false;
      }
      player.states[lastStatusTick + t].status = updatedStatus;
    }
  }
  player.lastState.status = event.tick;
};

const eventSpawn = (player, event) => {
  const { id, tick, side, pos, yaw, ...status } = event;
  player.lastState = {
    pose: tick,
    status: tick,
  };
  player.side = side;

  player.states[tick] = {
    pose: {
      pos: pos,
      yaw: yaw,
    },
    status: {
      ...status,
    },
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
      states: {},
    };

    pl.events.forEach((event) => {
      switch (event.id) {
        case 0:
          eventSpawn(player, event);
          break;
        case 1:
          setPose(player, event);
          setStatus(player, event);
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
        default:
      }
    });
    players.push(player);
  });

  setData(() => ({ players, deaths, shots }));
};
