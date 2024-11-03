import { mapRange } from "./utils";

export const simplify = (points, tolerance = 0.05) => {
  if (points.length < 3) return points;

  const getPerpendicularDistance = (point, lineStart, lineEnd) => {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;

    if (dx === 0 && dy === 0)
      return Math.sqrt(
        (point.x - lineStart.x) ** 2 + (point.y - lineStart.y) ** 2
      );

    const t =
      ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) /
      (dx * dx + dy * dy);

    const closestPoint = {
      x: lineStart.x + t * dx,
      y: lineStart.y + t * dy,
    };

    return Math.sqrt(
      (point.x - closestPoint.x) ** 2 + (point.y - closestPoint.y) ** 2
    );
  };

  const douglasPeucker = (points, start, end, tolerance) => {
    let maxDistance = 0;
    let index = 0;

    for (let i = start + 1; i < end; i++) {
      const distance = getPerpendicularDistance(
        points[i],
        points[start],
        points[end]
      );
      if (distance > maxDistance) {
        index = i;
        maxDistance = distance;
      }
    }

    if (maxDistance > tolerance) {
      const left = douglasPeucker(points, start, index, tolerance);
      const right = douglasPeucker(points, index, end, tolerance);

      return left.slice(0, -1).concat(right);
    } else {
      return [points[start], points[end]];
    }
  };

  return douglasPeucker(points, 0, points.length - 1, tolerance);
};

export const getPoint = (event, boundingRect, svgSize) => {
  if (!boundingRect) return;
  const { width, height, left, top } = boundingRect;
  const factor = svgSize / Math.min(width, height);
  const offsetX = Math.max(((width - height) * factor) / 2, 0);
  const offsetY = Math.max(((height - width) * factor) / 2, 0);
  const x = event.clientX - left;
  const y = event.clientY - top;
  return { x: factor * x - offsetX, y: factor * y - offsetY };
};

export const getTolerance = (scale) => {
  return 0.05 / mapRange(scale, 1, 8, 1, 3);
};

export const buildPath = (currentPath, scale) => {
  if (!currentPath || currentPath.normal.length === 0) {
    return currentPath ? [...currentPath.simplified] : [];
  }
  const tolerance = getTolerance(scale);
  const simplifiedNormalPart = simplify(currentPath.normal, tolerance);
  const startSliceIndex = currentPath.simplified.length > 0 ? 1 : 0;
  return [
    ...currentPath.simplified,
    ...simplifiedNormalPart.slice(startSliceIndex),
  ];
};
