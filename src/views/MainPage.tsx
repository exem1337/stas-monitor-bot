import DBListItem from "../components/DBListItem"
import { EDBStatuses } from "../enums/dbStatuses.enum"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { IUserData } from "../models/user.model";
import BaseButton from "../components/ui/BaseButton/BaseButton";

const MainPage = () => {
  const listId: Array<number> = [3,4,5,6,7,788];
  const { onToggleButton, tg } = useTelegram();
  const [userData, setUserData] = useState('');
  const [userDataUnsafe, setUserDataUnsafe] = useState<IUserData>({} as IUserData);

  function getQueryVariable(data, variable) {
    var query = data;
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

  useEffect(() => {
    tg.ready();
    setUserData(getQueryVariable(tg.initData, 'first_name'));
    setUserDataUnsafe(JSON.parse(JSON.stringify(tg.initDataUnsafe)) as unknown as IUserData)
  }, [])

  return (
    <div className="main-page">
      {userDataUnsafe && userDataUnsafe?.first_name}
      { listId.map((id) => 
          <DBListItem 
            id={id} 
            key={id} 
            name="sas" 
            status={EDBStatuses.Error} 
          />
        )
      }
      <BaseButton text="Кнопка" />
    </div>
  )
}

export default MainPage;
