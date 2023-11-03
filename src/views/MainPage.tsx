import DBListItem from "../components/DBListItem"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { IUserData } from "../models/user.model";
import BaseButton from "../components/ui/BaseButton/BaseButton";
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [listId, setListId] = useState([]);
  const { onToggleButton, tg } = useTelegram();
  const navigate = useNavigate();
  
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
    // await DBApi.getAllDbs()?.then((data) => { 
    //   console.log(data)
    //   setListId(data.data as any)});
  }

  useEffect(() => {
    tg.ready();
    getDb();
  }, [])

  return (
    <div className="main-page">
      <h4>Здравствуйте, { tg.initDataUnsafe?.user?.first_name }! Ваши подключения</h4>
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
