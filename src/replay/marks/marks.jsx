import "./marks.css";

const getMarks = (data) => {
  const marks = {
    [data.end]: <div className="mark end">End</div>,
  };

  if (data.plant)
    marks[data.plant.tick] = <div className="mark plant">Plant</div>;

  return marks;
};

export default getMarks;
