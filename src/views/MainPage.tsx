import DBListItem from "../components/DBListItem"
import { EDBStatuses } from "../enums/dbStatuses.enum"
import React, { useEffect } from 'react';
import { useTelegram } from "../hooks/useTelegram";

const MainPage = () => {
  const listId: Array<number> = [3,4,5,6,7,788];
  const { onToggleButton, tg } = useTelegram();
  
  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="main-page">
      {tg.initDataUnsafe?.user?.username}
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
