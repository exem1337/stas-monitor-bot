import DBListItem from "../components/DBListItem"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { AiOutlinePlus } from 'react-icons/ai'
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";
import BaseActionButton, { BaseActionButtonSlot } from "../components/ui/ActionButton/BaseActionButton";
import { IDbHost } from "../models/db.model";
import { Spinner } from "react-bootstrap";

const MainPage = () => {
  const [dbs, setDbs] = useState<Array<IDbHost>>([]);
  const { onToggleButton, tg } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const getDb = async () => {
    setIsLoading(true);
    await DBApi.getAllDbs(tg.initDataUnsafe?.user?.id)?.then((data) => { 
      setDbs(data.data as any)
    });
    setIsLoading(false);
  }

  useEffect(() => {
    tg.ready();
    getDb();
  }, [])

  if (isLoading) {
    return (
      <div className="app-loader">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="main-page">
      <h4>Здравствуйте, { tg.initDataUnsafe?.user?.first_name }!</h4>
      <h6>Ваши подключения:</h6>

      {tg.initDataUnsafe?.user?.id}

      <BaseActionButton 
        text="Добавить подключение"
        className="add-connection"
        handler={() => navigate('/add')}
      >
        <BaseActionButtonSlot>
          <AiOutlinePlus />
        </BaseActionButtonSlot>
      </BaseActionButton>

      { dbs?.length && dbs?.map((db, key) => 
        <div className="main-page--db" key={key}>
          <p className="main-page--db__host">{ db.host }</p>
          { db.databases && db.databases?.map((database, index) => 
            <DBListItem 
              id={database.name} 
              key={index} 
              name={database.name} 
              status={database.state} 
            />
          ) }
        </div>
        )
      }
    </div>
  )
}

export default MainPage;
