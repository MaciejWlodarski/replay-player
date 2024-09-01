const eventSpawn = (event) => {
  const { tick, side, type } = event;
  return {
    start: tick,
    side,
    type,
    fires: new Array(16),
  };
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
          const { tick, idx, pos } = event;
          inferno.fires[idx] = {
            start: tick,
            pos,
          };
          break;
        }
        case 2: {
          const { tick, idx } = event;
          inferno.fires[idx].end = tick;
          break;
        }
        case 3: {
          inferno.end = event.tick;
          break;
        }
      }
    });
  });

  return infernos;
};
