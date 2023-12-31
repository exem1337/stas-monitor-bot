import DBListItem from "../components/DBListItem";
import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../hooks/useTelegram";
import { DBApi } from "../services/dbApiService";
import { useNavigate } from "react-router-dom";
import { IDatabaseHost, ISelectedHost } from "../models/db.model";
import { Spinner } from "react-bootstrap";
import BaseAlert from "../components/ui/BaseAlert/BaseAlert";
import TypeMarker from "../components/ui/TypeMarker/TypeMarker";
import { MdMoreVert } from "react-icons/md";
import { EnTypeLogEnum } from "../components/ui/enums/enTypeLog.enum";
import HostActionSelect from "../components/HostActionSelect/HostActionSelect";
import Drawer from "react-modern-drawer";
import { AiOutlineClose } from "react-icons/ai";
import "react-modern-drawer/dist/index.css";

const MainPage = () => {
  const [dbs, setDbs] = useState<Array<IDatabaseHost>>([]);
  const { tg, user } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedHost, setSelectedHost] = useState<ISelectedHost>();

  const openDrawer = useCallback(
    (
      name: string,
      status: EnTypeLogEnum,
      connectionId: number,
      host: string
    ) => {
      document.body.style.overflowY = "hidden";
      setSelectedHost({
        name,
        status,
        connectionId,
        host,
      });
      setIsVisible(true);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    document.body.style.overflowY = "auto";
    setSelectedHost({} as ISelectedHost);
    setIsVisible(false);
  }, []);

  const getDb = async () => {
    try {
      setIsLoading(true);
      setDbs(await DBApi.getAllDbs(user?.id));
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const onGoToAdd = () => {
    navigate("/add");
  };

  const onCloseAndRefreshDrawer = async () => {
    closeDrawer();
    await getDb();
  };

  useEffect(() => {
    tg.ready();
    getDb();
  }, []);

  useEffect(() => {
    if (isLoading || error || isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: "+ Добавить подключение",
      });
    }

    return () => {
      tg.MainButton.hide();
    };
  }, [isLoading, isVisible]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onGoToAdd);
    return () => {
      tg.offEvent("mainButtonClicked", onGoToAdd);
    };
  }, [onGoToAdd]);

  if (isLoading) {
    return (
      <div className="app-loader">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <BaseAlert text="Произошла ошибка при получении списка подключений" />
    );
  }

  return (
    <div className="main-page">
      <h4>Здравствуйте, {user?.first_name}!</h4>
      <h6>Ваши подключения:</h6>
      {dbs?.length ? (
        dbs?.map((db, key) => (
          <div className="main-page--db" key={key}>
            <div className="main-page--db__host">
              <TypeMarker type={db.status} />
              <div className={"main-page--db__host-bottom"}>
                <p>
                  {db?.connection?.name}
                  <br />
                  <span>{db.host}</span>
                </p>
              </div>
              <MdMoreVert
                onClick={() =>
                  openDrawer(
                    db.connection.name,
                    db.status,
                    db.connection.id,
                    db.host
                  )
                }
              />
            </div>
            {db.databases?.length ? (
              db.databases?.map((database, index) => (
                <DBListItem
                  id={database.oid}
                  key={index}
                  name={database.name}
                  status={database.state}
                  clients={database.backends}
                />
              ))
            ) : (
              <BaseAlert
                text={"Отсутствуют подключения к хосту"}
                variant={"danger"}
              />
            )}
          </div>
        ))
      ) : (
        <BaseAlert text={"У вас нет подключений"} variant={"light"} />
      )}
      <Drawer
        open={isVisible}
        direction="bottom"
        duration={250}
        onClose={closeDrawer}
        className="host-actions"
      >
        <div className={"d-flex justify-content-end"}>
          <AiOutlineClose
            className={"btn-close"}
            onClick={() => closeDrawer()}
          />
        </div>
        {!!selectedHost && (
          <HostActionSelect
            connectionId={selectedHost.connectionId}
            name={selectedHost?.name}
            status={selectedHost?.status}
            closeDrawerFn={onCloseAndRefreshDrawer}
            host={selectedHost?.host}
          />
        )}
      </Drawer>
    </div>
  );
};

export default MainPage;
