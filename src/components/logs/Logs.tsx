import React from 'react';
import {IDbHostLog} from "../../models/db.model";
import {Accordion} from "react-bootstrap";
import StatusBadge from "../ui/StatusBadge/StatusBadge";
import TypeMarker from "../ui/TypeMarker/TypeMarker";

const Logs = (props: IDbHostLog ) => {
   console.log(props)
   return (
      <Accordion className={'mb-3'} alwaysOpen>
         <Accordion.Item eventKey="0">
            <Accordion.Header className={'d-flex align-items-baseline'}>
               <TypeMarker type={props.type}/><span className={'ms-1'}> {props.host}</span>
            </Accordion.Header>
            <Accordion.Body>
               <p>Дата: {new Date(props.date).toLocaleString()}</p>
               <p>
                  {props.message}
               </p>
            </Accordion.Body>
         </Accordion.Item>
      </Accordion>
   );
};

export default Logs;