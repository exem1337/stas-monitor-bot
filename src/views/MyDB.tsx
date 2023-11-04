import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Container, ProgressBar, Spinner } from "react-bootstrap";
import { useTelegram } from "../hooks/useTelegram";
import Chart from "./Chart";
import BaseButton from "../components/ui/BaseButton/BaseButton";
import { IDatabase, IDbCharts } from "../models/db.model";
import { DBApi } from "../services/dbApiService";
import StatusBadge from "../components/ui/StatusBadge/StatusBadge";
import ReloadButton from "../components/ui/ReloadButton/ReloadButton";

const MyDB = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [database, setDatabase] = useState<IDatabase>({} as IDatabase);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(true);
  const [charts, setCharts] = useState<Array<Array<unknown>>>([]);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const getDbInfo = async (needLoader = true) => {
    abortController.abort();

    try {
      setIsReloading(true);
      needLoader && setIsLoading(true);
      setDatabase(await DBApi.getDb(Number(id)));
    } catch (err) {
      console.error(err);
    } finally {
      needLoader && setIsLoading(false);
      setIsReloading(false);
    }
  };

  useEffect(() => {
    setCharts([
      database.charts?.sessions?.map((session) => ({
        name: new Date(session.date),
        time: session.date,
        Значение: session.value,
      })),
      database.charts?.trans_idle?.map((transaction) => ({
        name: new Date(transaction.date),
        time: transaction.date,
        Значение: transaction.value,
      })),
    ]);
  }, [database]);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    getDbInfo();

    const interval = setInterval(() => {
      getDbInfo(false);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onDbReload = async () => {
    setIsReloading(true);
    await DBApi.reloadDb("", database.name);
    await getDbInfo();
    setIsReloading(false);
  };

  if (isLoading) {
    return (
      <div className="app-loader">
        <Spinner />
      </div>
    );
  }

  return (
    <Container className="my-db">
      <ReloadButton isLoading={isReloading} handler={() => getDbInfo(false)} />
      <div className={"d-flex align-items-center"}>
        <h1 className={"mb-2"}>
          <span>{database.name}</span>
        </h1>
        <StatusBadge status={database.state} />
      </div>

      <BaseButton
        text="Назад"
        className="back-button"
        onClick={() => navigate("/")}
      />

      <br />

      <span>Занято дискового пространства</span>
      <ProgressBar
        now={(database.size / database.tablespace?.size) * 100}
        label={`${Math.round(
          (database.size / database.tablespace?.size) * 100
        )}%`}
      />

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Количество активных сессий</Accordion.Header>
          <Accordion.Body>
            <Chart data={charts?.[0]} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Количество транзакций</Accordion.Header>
          <Accordion.Body>
            <Chart data={charts?.[1]} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <BaseButton
        text="Перезагрузить бд"
        onClick={onDbReload}
        loading={isReloading}
      />

      <h6>Логи</h6>
      <div className="logs">
        {database?.hostLogs?.map((log) => (
          <div>
            <span>{new Date(log.date).toString()}</span>
            <span>{log.message}</span>
            <span>{log.type}</span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MyDB;
