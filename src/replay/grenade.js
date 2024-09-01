const eventCreation = (event) => {
  return {
    side: event.side,
    type: event.type,
    start: event.tick,
    pose: [{ tick: event.tick, pos: event.pos }],
  };
};

const eventBounce = (grenade, event, grenades) => {
  const lastPose = grenade.pose[grenade.pose.length - 1];
  grenade.pose.push({
    ...lastPose,
    tick: event.tick,
    pos: event.pos,
  });
};

const eventExplosion = (grenade, event, grenades) => {
  grenade.explode = event.tick;

  const lastPose = grenade.pose[grenade.pose.length - 1];
  grenade.pose.push({
    ...lastPose,
    tick: event.tick,
    pos: event.pos,
  });
};

const eventDestruction = (grenade, event, grenades) => {
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

  grenades.push(grenade);
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
      } else {
        grenadeEvent[event.id](grenade, event, grenades);
      }
    });
  });

  return grenades;
};
