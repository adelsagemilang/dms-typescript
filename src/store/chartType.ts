export interface DataPie {
  name: string;
  value: number;
}

export interface DataLine {
  name: string;
}

export interface DataBar {
  name: string;
}

export interface DataGauge {
  value: number;
  maxValue: number;
  allSegments: number[];
}

export interface Margin {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
