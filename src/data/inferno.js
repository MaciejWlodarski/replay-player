const eventSpawn = (event) => {
  const { tick, side, type } = event;
  return {
    start: tick,
    side,
    type,
    fires: new Array(16),
    end: null,
  };
};

const eventFireStart = (inferno, event) => {
  const { tick, idx, pos } = event;
  inferno.fires[idx] = {
    start: tick,
    pos,
  };
};

const eventFireExpire = (inferno, event) => {
  const { tick, idx } = event;
  inferno.fires[idx].end = tick;
};

const postProcessing = (inferno) => {
  let totalX = 0;
  let totalY = 0;
  let totalZ = 0;
  let validCount = 0;
  let end = 0;

  inferno.fires.forEach((fire) => {
    if (fire) {
      totalX += fire.pos.x;
      totalY += fire.pos.y;
      totalZ += fire.pos.z;
      validCount++;
      end = fire.end ? Math.max(end, fire.end) : Infinity;
    }
  });

  if (!validCount) return;
  const centroidX = totalX / validCount;
  const centroidY = totalY / validCount;
  const centroidZ = totalZ / validCount;
  inferno.centroid = { x: centroidX, y: centroidY, z: centroidZ };
  inferno.end = end;
};

export const getInfernos = (data) => {
  const infernos = [];

  Object.values(data.infernos).forEach((inf) => {
    let inferno;

    inf.events.forEach((event) => {
      switch (event.id) {
        case 0: {
          inferno = eventSpawn(event);
          infernos.push(inferno);
          break;
        }
        case 1: {
          eventFireStart(inferno, event);
          break;
        }
        case 2: {
          eventFireExpire(inferno, event);
          break;
        }
        default:
          break;
      }
    });
  });

  infernos.forEach((inferno) => postProcessing(inferno));

  return infernos;
};

export const groupInfernos = (infernos, map, level, tick) => {
  return infernos.reduce(
    (acc, inferno) => {
      const { start, end, centroid } = inferno;
      if (tick < start || tick > end) return acc;

      const upper = map.lower === null || centroid.z >= map.lower;

      if (upper === level) {
        acc.on.push(inferno);
        return acc;
      }

      acc.off.push(inferno);
      return acc;
    },
    { on: [], off: [] }
  );
};
