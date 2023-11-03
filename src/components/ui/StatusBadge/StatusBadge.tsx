import React from "react";
import { DB_STATUS_NAME_MAP } from "../../../constants/dbStatusNameMap.const";
import { DB_STATUS_COLOR_MAP } from "../../../constants/dbStatusColorMap.const";
import { EDBStatuses } from "../../../enums/dbStatuses.enum";

const StatusBadge = ({ status }: { status: EDBStatuses }) => {
  if (status) {
    return (
      <span className={`ms-2 status-badge ${DB_STATUS_COLOR_MAP.get(status)}`}>
        {DB_STATUS_NAME_MAP.get(status)}
      </span>
    );
  } else {
    return null;
  }
};

export default StatusBadge;
