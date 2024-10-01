import { findSurroundingEventsBinary } from "/src/utils/utils";

const eventDrop = (event) => {
  return {
    type: event.type,
    start: event.tick,
    pose: [{ tick: event.tick, pos: event.pos }],
  };
};

const eventPickUp = (equipment, event) => {
  equipment.end = event.tick;
  equipment.pose.push({
    tick: event.tick - 1,
    pos: event.pos,
  });
};

const eventPosUpdate = (equipment, event) => {
  equipment.pose.push({
    tick: event.tick,
    pos: event.pos,
  });
};

export const getEquipment = (data) => {
  const items = [];

  Object.values(data.equipment).forEach((eq) => {
    let equipment;

    eq.events.forEach((event) => {
      switch (event.id) {
        case 0: {
          equipment = eventDrop(event);
          items.push(equipment);
          break;
        }
        case 1: {
          eventPickUp(equipment, event);
          break;
        }
        case 2: {
          eventPosUpdate(equipment, event);
          break;
        }
      }
    });
  });

  items.forEach((eq) => {
    if (!eq.end) {
      eq.end = data.last;

      const lastPose = {
        tick: eq.end,
        pos: eq.pose[eq.pose.length - 1].pos,
      };
      eq.pose.push(lastPose);
    }
  });

  return items;
};

export const getEquipmentPose = (equipment, targetTick) => {
  const events = findSurroundingEventsBinary(equipment, targetTick);
  if (!events) return;

  let { start, end } = events;
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

  return { tick: targetTick, pos };
};
