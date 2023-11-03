import { useNavigate } from "react-router-dom";
import { EDBStatuses } from "../enums/dbStatuses.enum";
import { DB_STATUS_NAME_MAP } from "../constants/dbStatusNameMap.const";
import "./DBListItem.scss"

interface IDbListItemProps {
  id: number;
  name: string;
  status: EDBStatuses;
}

const DBListItem = (props: IDbListItemProps) => {
  const navigate = useNavigate();
  
  const onGoToDb = () => {
    navigate(`/${props.id}`);  
  }
  
  return(
    <div 
      className="db-item"
      onClick={onGoToDb}
    >
      <span className="db-item--name">{ props.name }</span>
      <span>Статус: { DB_STATUS_NAME_MAP.get(props.status) }</span>
    </div>
  )
}

export default DBListItem;