import { useNavigate } from "react-router-dom";
import { EDBStatuses } from "../enums/dbStatuses.enum";
import { DB_STATUS_NAME_MAP } from "../constants/dbStatusNameMap.const";
import "./DBListItem.scss"
import { DB_STATUS_COLOR_MAP } from "../constants/dbStatusColorMap.const";
import StatusBadge from "./ui/StatusBadge/StatusBadge";
import { IDatabaseClient } from "../models/db.model";
import { Accordion } from "react-bootstrap";

interface IDbListItemProps {
  id: number;
  name: string;
  status: EDBStatuses;
  clients: Array<IDatabaseClient>;
}

const DBListItem = (props: IDbListItemProps) => {
  const navigate = useNavigate();
  
  const onGoToDb = () => {
    navigate(`/${props.id}`);  
  }
  return(
    <>
      <div 
        className="db-item"
        onClick={onGoToDb}
      >
        <span className="db-item--name">{ props.name }</span>
        <StatusBadge status={props.status} />
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Активные подключения</Accordion.Header>
            <Accordion.Body>
              { (props.clients || [])?.filter((client) => client.application_name)?.map((client) => <div className="db-item--client">
                <span>
                  {client.application_name}
                </span>
                <span>
                  {client.client_addr}
                </span>
              </div>) }
            </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default DBListItem;