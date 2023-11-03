import React, { useEffect } from "react";
import styles from "../components/MyDb/my-db-style.module.scss";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTelegram } from "../hooks/useTelegram";

const Chart = (props) => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  
  const tickFormatter = (value: number) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  
  return (
    <div className={styles.container__bloc}>
      <ResponsiveContainer
        width="100%"
        height={200}
        initialDimension={{ width: 520, height: 400 }}
      >
        <AreaChart
          width={730}
          height={150}
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="1" y2="1">
              <stop
                offset="5%"
                stopColor={tg.MainButton?.color}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={tg.MainButton?.color}
                stopOpacity={0.5}
              />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={tg.MainButton?.color}
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor={tg.MainButton?.color}
                stopOpacity={0.5}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis dataKey="Значение" />
          <XAxis
            dataKey="time"
            type="number"
            scale="time"
            domain={["auto", "auto"]}
            tickFormatter={tickFormatter}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Значение"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
