export const pointsToPathD = (points) => {
  if (points.length === 0) return "";

  const start = points[0];
  const pathD = points
    .slice(1)
    .reduce(
      (acc, point) => `${acc} L ${point.x},${point.y}`,
      `M ${start.x},${start.y}`
    );

  return pathD;
};

export const getMidPoint = (p1, p2) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

export const getPoint = (event, rect, svgSize) => {
  const { width, height, left, top } = rect;
  const factor = svgSize / Math.min(width, height);

  const x = event.clientX - left;
  const y = event.clientY - top;

  const offsetX = Math.max(((width - height) * factor) / 2, 0);
  const offsetY = Math.max(((height - width) * factor) / 2, 0);

  return {
    x: factor * x - offsetX,
    y: factor * y - offsetY,
  };
};
