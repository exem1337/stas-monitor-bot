import DBListItem from "../components/DBListItem"
import { EDBStatuses } from "../enums/dbStatuses.enum"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { IUserData } from "../models/user.model";
import BaseButton from "../components/ui/BaseButton/BaseButton";
import api from '../http'
import { DBApi } from "../services/dbApiService";
const MainPage = () => {
  const [listId, setListId] = useState([]);
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

  const getDb = async () => {
    await DBApi.getAllDbs()?.then((data) => { 
      console.log(data)
      setListId(data.data as any)});
  }

  useEffect(() => {
    tg.ready();
    getDb();
    setUserData(getQueryVariable(tg.initData, 'first_name'));
    setUserDataUnsafe(JSON.parse(JSON.stringify(tg.initDataUnsafe)) as unknown as IUserData)
  }, [])

  return (
    <div className="main-page">
      <BaseButton text="sas" />
      {process.env.REACT_APP_API_URL}
      { listId?.length && listId?.map((id) => 
          <DBListItem 
            id={id.active_time} 
            key={id.active_time} 
            name={id.name} 
            status={id.state} 
          />
        )
      }
    </div>
  )
}

export default MainPage;
