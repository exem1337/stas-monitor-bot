import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/MyDb/my-db-style.module.scss";
import {Container} from "react-bootstrap";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
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

  return (
     <Container>
       <h1>{db.name}</h1>
       ID = {db.id}
       <div className={`${styles.container}`}>
         <Chart data={db.data}/>
       </div>
     </Container>
  );
};

export default MyDB;
