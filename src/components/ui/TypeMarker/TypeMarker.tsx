import React from 'react';
import {DB_TYPE_LOG_COLOR_MAP} from "../../../constants/dbTypeLogColorMap.const";

const TypeMarker = ({type}) => {
   return (
      <div style={{backgroundColor: `${DB_TYPE_LOG_COLOR_MAP.get(type)}`}} className={'type-log-circle'}/>
   );
};

export default TypeMarker;