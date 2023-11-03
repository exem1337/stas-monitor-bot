import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../components/MyDb/my-db-style.module.scss";
import {Container} from "react-bootstrap";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useTelegram} from '../hooks/useTelegram'

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
  const tickFormatter = (value: number) => new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  return (
     <Container>
       <h1>{db.name}</h1>
       ID = {db.id}
       <div className={`${styles.container}`}>
         <div className={styles.container__bloc}>
           <ResponsiveContainer width="100%" height={200} initialDimension={{width: 520, height: 400}}>
             <AreaChart width={730} height={150} data={db.data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id="colorUv" x1="1" y1="1" x2="1" y2="1">
                   <stop offset="5%" stopColor={tg?.ThemeParams?.bg_color} stopOpacity={0.5}/>
                   <stop offset="95%" stopColor={tg?.ThemeParams?.bg_color} stopOpacity={0.5}/>
                 </linearGradient>
                 <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor={tg?.ThemeParams?.bg_color} stopOpacity={0.5}/>
                   <stop offset="95%" stopColor={tg?.ThemeParams?.bg_color} stopOpacity={0.5}/>
                 </linearGradient>
               </defs>
               {/*<XAxis dataKey="name"/>*/}
               <YAxis dataKey="Сбои"/>
               <XAxis dataKey="time" type="number" scale="time" domain={['auto', 'auto']} tickFormatter={tickFormatter} />
               <Tooltip />
               <Area type="monotone" dataKey="Сбои" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
             </AreaChart>
           </ResponsiveContainer>
         </div>
       </div>
     </Container>
  );
};

export default MyDB;
