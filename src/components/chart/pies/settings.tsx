import * as React from 'react';

const defaultRadian = Math.PI / 180;

export const defaultColors = ['#5DBFBD', '#5C63AF'];

export const defaultDimension = {
  width: 200,
  height: 200,
};

export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * defaultRadian);
  const y = cy + radius * Math.sin(-midAngle * defaultRadian);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
