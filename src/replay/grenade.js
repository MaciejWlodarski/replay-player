import { findSurroundingEventsBinary } from "/src/utils/utils";

const eventCreation = (event) => {
  return {
    side: event.side,
    type: event.type,
    start: event.tick,
    thrower: event.thrower,
    pose: [{ tick: event.tick, pos: event.pos }],
  };
};

const eventBounce = (grenade, event) => {
  const lastPose = grenade.pose[grenade.pose.length - 1];
  grenade.pose.push({
    ...lastPose,
    tick: event.tick,
    pos: event.pos,
  });
};

const eventExplosion = (grenade, event) => {
  grenade.explode = event.tick;

  const lastPose = grenade.pose[grenade.pose.length - 1];
  grenade.pose.push({
    ...lastPose,
    tick: event.tick,
    pos: event.pos,
  });
};

const eventDestruction = (grenade, event) => {
  grenade.end = event.tick;

  const lastPose = grenade.pose[grenade.pose.length - 1];
  grenade.pose.push({
    ...lastPose,
    tick: event.tick,
    pos: event.pos,
  });

  if (grenade.type === 504) {
    grenade.explode = event.tick;
    grenade.end += 32;
    grenade.pose.push({
      ...lastPose,
      tick: event.tick + 32,
      pos: event.pos,
    });
  }
};

const grenadeEvent = {
  0: eventCreation,
  1: eventBounce,
  2: eventExplosion,
  3: eventDestruction,
};

export const getGrenades = (data) => {
  const grenades = [];

  Object.values(data.grenades).forEach((gnd) => {
    let grenade;

    gnd.events.forEach((event) => {
      if (event.id === 0) {
        grenade = grenadeEvent[event.id](event);
        grenades.push(grenade);
      } else {
        grenadeEvent[event.id](grenade, event);
      }
    });
  });

  return grenades;
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

export const groupGrenades = (grenades, map, level, tick) => {
  return grenades.reduce(
    (acc, grenade) => {
      const pose = getGrenadePose(grenade, tick);
      if (!pose) return acc;

      const upper = map.lower === null || pose.pos.z >= map.lower;

      const grenadeInfo = { grenade, pose };

      if (upper === level) {
        acc.on.push(grenadeInfo);
        return acc;
      }

      acc.off.push(grenadeInfo);
      return acc;
    },
    { on: [], off: [] }
  );
};
