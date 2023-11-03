import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Accordion, Container, ProgressBar} from "react-bootstrap";
import {useTelegram} from '../hooks/useTelegram'
import Chart from "./Chart";

const MyDB = () => {
  const param = useParams()
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
  const {onToggleButton, tg} = useTelegram();
  
  useEffect(() => {
    tg.ready();
  }, []);

  const now = 60;

  return (
    <Container className="my-db">
      <h1>{db.name}</h1>
      <span>Занято дискового пространства</span>
      <ProgressBar now={now} label={`${now}%`} />
      
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
