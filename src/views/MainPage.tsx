import DBListItem from "../components/DBListItem"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTelegram } from "../hooks/useTelegram";
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";
import { IDatabaseHost, ISelectedHost } from "../models/db.model";
import { Spinner } from "react-bootstrap";
import BaseAlert from "../components/ui/BaseAlert/BaseAlert";
import { EFixProblemHandlers } from "../components/ui/enums/fixProblemHandlers.enum";
import { DB_ACTIONS_MAP } from "../constants/dbActionMap.const";
import TypeMarker from "../components/ui/TypeMarker/TypeMarker";
import { MdMoreVert } from 'react-icons/md'
import { EnTypeLogEnum } from "../components/ui/enums/enTypeLog.enum";
import HostActionSelect from "../components/HostActionSelect/HostActionSelect";

const MainPage = () => {
  const [dbs, setDbs] = useState<Array<IDatabaseHost>>([]);
  const { tg, user } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedHost, setSelectedHost] = useState<ISelectedHost>();
  const openDrawer = useCallback((name: string, status: EnTypeLogEnum) => { 
    setSelectedHost({
      name,
      status
    })
    setIsVisible(true)}
  , [])
  const closeDrawer = useCallback(() => { 
    setSelectedHost({} as ISelectedHost)
    setIsVisible(false)
  }, [])

  const getDb = async () => {
    try {
      setIsLoading(true);
      setDbs(await DBApi.getAllDbs(user?.id));
    }
    catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  const onGoToAdd = () => {
    navigate('/add');
  }

  const onSelectDbAction = async (event: EFixProblemHandlers, host: string) => {
    await DB_ACTIONS_MAP.get(event)?.(host);
  }

  useEffect(() => {
    tg.ready();
    getDb();
  }, [])

  useEffect(() => {
    if (isLoading || error) {
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

  if (error) {
    return (
      <BaseAlert text="Произошла ошибка при получении списка подключений" />
    )
  }

  return (
    <div className="main-page">
      <h4>Здравствуйте, { user?.first_name }!</h4>
      <h6>Ваши подключения:</h6>

      { dbs?.length && dbs?.map((db, key) => 
        <div className="main-page--db" key={key}>
          <div className="main-page--db__host">
            <TypeMarker type={db.status} />
            <p>{ db.host }</p>
            <MdMoreVert onClick={() => openDrawer(db.host, db.status)} />
          </div>
          { db.databases?.length ? db.databases?.map((database, index) => 
            <DBListItem 
              id={database.oid} 
              key={index} 
              name={database.name} 
              status={database.state} 
            />
          ) : <></> }
        </div>
        )
      }
      
      {/* { selectedHost?.name ? <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
        className="host-actions"
      >
        <HostActionSelect name={selectedHost.name} status={selectedHost.status} />
      </Drawer> : <></>
      } */}
    </div>
  )
}

export default MainPage;
