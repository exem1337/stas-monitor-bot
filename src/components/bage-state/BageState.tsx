import React from 'react';
import {DB_STATUS_NAME_MAP} from "../../constants/dbStatusNameMap.const";
import {DB_STATUS_COLOR_MAP} from "../../constants/dbStatusColorMap.const";

const BageState = ({state}) => {
   if(state){
      return (
         <span className={`ms-2 my-db--status__${DB_STATUS_COLOR_MAP.get(state)} ${DB_STATUS_COLOR_MAP.get(state)}`}>
            {DB_STATUS_NAME_MAP.get(state)}
         </span>
      );
   } else {
      return null
   }
};

export default BageState;