import DBListItem from "../components/DBListItem"
import { EDBStatuses } from "../enums/dbStatuses.enum"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";

const MainPage = () => {
  const listId: Array<number> = [3,4,5,6,7,788];
  const { onToggleButton, tg } = useTelegram();
  const [userData, setUserData] = useState('');
  const [userDataUnsafe, setUserDataUnsafe] = useState('');
  useEffect(() => {
    tg.ready();
    setUserData(JSON.stringify(tg.initData));
    setUserDataUnsafe(JSON.stringify(tg.initDataUnsafe))
  }, [])

  return (
    <div className="main-page">
      {userData}
      {userDataUnsafe}
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
