declare module 'react-usa-map' {
  import React from 'react';

  interface USAMapProps {
    customize?: { [stateKey: string]: { fill: string } };
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
    width?: string | number;
    height?: string | number;
    title?: string;
    defaultFill?: string;
    labelFunction?: (stateCode: string) => { [key: string]: any };
  }

  const USAMap: React.FC<USAMapProps>;

  export default USAMap;
}
