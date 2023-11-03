import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Accordion, Container, ProgressBar, Spinner} from "react-bootstrap";
import {useTelegram} from '../hooks/useTelegram'
import Chart from "./Chart";
import BaseButton from "../components/ui/BaseButton/BaseButton";
import {IDatabase, IDatabaseHost} from "../models/db.model";
import {DBApi} from "../services/dbApiService";
import {DB_STATUS_NAME_MAP} from "../constants/dbStatusNameMap.const";
import {EDBStatuses} from "../enums/dbStatuses.enum";
import BageState from "../components/bage-state/BageState";

const MyDB = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [database, setDatabase] = useState<IDatabase>({} as IDatabase);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const interval = setInterval(() => {
    getDbInfo(false);
  }, 30000)

  const getDbInfo = async (needLoader = true) => {
    needLoader && setIsLoading(true);
    setDatabase(await DBApi.getDb(Number(id)));
    needLoader && setIsLoading(false);
  }

   useEffect(() => {
      getDbInfo();
   }, [])

  const db = {
    id: 1,
    name: "Имя",
    data: [
       {
         name: 'Имя1', time: Date.now() , 'Сбои': "300",
       },
      {
        name: 'Имя2', time: Date.now() - 10000, 'Сбои': "700",
      },
      {
        name: 'Имя3', time: Date.now() - 18000, 'Сбои': "500",
      },
      {
        name: 'Имя4', time: Date.now() - 35000, 'Сбои': "100",
      },
    ]
};
  const { tg } = useTelegram();
  
  useEffect(() => {
    tg.ready();

    return () => {
      clearInterval(interval);
    }
  }, []);

  const now = 60;

  if (isLoading) {
    return (
      <div className="app-loader">
        <Spinner />
      </div>
    )
  }

  return (
    <Container className="my-db">
      <div className={'d-flex align-items-center'}>
        <h1 className={'mb-2'}>
          <span>{database.name}</span>
        </h1>
        <BageState state={database.state}/>
      </div>

      <BaseButton
        text="Назад"
        className="back-button"
        onClick={() => navigate('/')}
      />

      <br />

      <span>Занято дискового пространства</span>
      <ProgressBar now={(database.size / database.tablespace?.size) * 100} label={`${now}%`} />
      
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Количество активных сессий</Accordion.Header>
          <Accordion.Body>
            <Chart data={db.data}/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Количество транзакций</Accordion.Header>
          <Accordion.Body>
            <Chart data={db.data}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MyDB;
