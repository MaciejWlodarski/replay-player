export const groupBombEvents = (plant, defuse, map, level, tick) => {
  const bombState = { on: null, off: null };

  if (!plant || plant.tick > tick) return bombState;

  const upper = map.lower === null || plant.pos.z >= map.lower;
  const bombEvents = { plant, defuse };

  if (upper === level) {
    bombState.on = bombEvents;
    return bombState;
  }

  bombState.off = bombEvents;
  return bombState;
};
