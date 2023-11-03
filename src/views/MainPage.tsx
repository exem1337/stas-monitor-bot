import DBListItem from "../components/DBListItem"
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";
import { IDatabaseHost } from "../models/db.model";
import { Spinner } from "react-bootstrap";

const MainPage = () => {
  const [dbs, setDbs] = useState<Array<IDatabaseHost>>([]);
  const { tg, user } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const getDb = async () => {
    setIsLoading(true);
    setDbs(await DBApi.getAllDbs(user?.id));
    setIsLoading(false);
  }

  const onGoToAdd = () => {
    navigate('/add');
  }

  useEffect(() => {
    tg.ready();
    getDb();
  }, [])

  useEffect(() => {
    if (isLoading) {
      tg.MainButton.hide();
    }
    else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: '+ Добавить подключение'
      })
  
    }

    return () => {
      tg.MainButton.hide();
    }
  }, [isLoading])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onGoToAdd)
    return () => {
      tg.offEvent('mainButtonClicked', onGoToAdd);
    }
  }, [onGoToAdd])

  if (isLoading) {
    return (
      <div className="app-loader">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="main-page">
      <h4>Здравствуйте, { user?.first_name }!</h4>
      <h6>Ваши подключения:</h6>

      { dbs?.length && dbs?.map((db, key) => 
        <div className="main-page--db" key={key}>
          <p className="main-page--db__host">{ db.host }</p>
          { db.databases && db.databases?.map((database, index) => 
            <DBListItem 
              id={database.oid} 
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
