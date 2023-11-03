import DBListItem from "../components/DBListItem"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { AiOutlinePlus } from 'react-icons/ai'
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";
import BaseActionButton, { BaseActionButtonSlot } from "../components/ui/ActionButton/BaseActionButton";

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
    await DBApi.getAllDbs()?.then((data) => { 
        setListId(data.data as any)
      }
    );
  }

  useEffect(() => {
    tg.ready();
    getDb();
  }, [])

  return (
    <div className="main-page">
      <h4>Здравствуйте, { tg.initDataUnsafe?.user?.first_name }!</h4>
      <h6>Ваши подключения:</h6>

      <BaseActionButton 
        text="Добавить подключение"
        handler={() => navigate('/add')}
      >
        <BaseActionButtonSlot>
          <AiOutlinePlus />
        </BaseActionButtonSlot>
      </BaseActionButton>

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
