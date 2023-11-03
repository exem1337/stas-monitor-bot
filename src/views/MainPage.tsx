import DBListItem from "../components/DBListItem"
import { EDBStatuses } from "../enums/dbStatuses.enum"
import React from 'react';

const MainPage = () => {
  const listId: Array<number> = [3,4,5,6,7,788];

  return (
    <div className="main-page">
      { listId.map((id) => 
          <DBListItem 
            id={id} 
            key={id} 
            name="sas" 
            status={EDBStatuses.Error} 
          />
        )
      }
    </div>
  )
}

export default MainPage;