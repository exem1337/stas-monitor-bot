import React from "react";
import { DB_TYPE_LOG_COLOR_MAP } from "../../../constants/dbTypeLogColorMap.const";
import { EnTypeLogEnum } from "../enums/enTypeLog.enum";

interface ITypeMarkerProps {
  type: EnTypeLogEnum;
}

const TypeMarker = (props: ITypeMarkerProps) => {
   return (
      <div style={{backgroundColor: `${DB_TYPE_LOG_COLOR_MAP.get(props.type)}`}} className={'type-log-bloc__circle'}/>
   );
};

export default TypeMarker;
