import { useEffect, useState } from "react";
import { ICreateConnection, ISelectedHost } from "../../models/db.model";
import BaseButton from "../ui/BaseButton/BaseButton";
import { EnTypeLogEnum } from "../ui/enums/enTypeLog.enum";
import { useValidationForm } from "../ui/utils/useValidationForm";
import BaseInput from "../ui/BaseInput/BaseInput";
import { Validators } from "../ui/validators/validators.util";
import { DBApi } from "../../services/dbApiService";
import { Spinner } from "react-bootstrap";
import { useTelegram } from "../../hooks/useTelegram";

class HostActions {
  closeDrawer = null;
  connectionId = null;
  setDefaultView = null;
  name = null;
  host = null;
  connectionInfo = null;

  constructor(
    closeDrawerFn: () => void,
    connectionId: number,
    name: string,
    host: string
  ) {
    this.closeDrawer = closeDrawerFn;
    this.name = name;
    this.connectionId = connectionId;
    this.host = host;
  }

  set setDefaultViewFn(fn: () => void) {
    this.setDefaultView = fn;
  }

  async getConnectionInfo() {
    this.connectionInfo = (await DBApi.getConnection(this.connectionId))?.data as ICreateConnection
  }

  close() {
    this.connectionId = null;
    this.name = null;
    this.host = null;
    this.closeDrawer?.();
  }
}

const DeleteView = ({ hostActions }: { hostActions: HostActions }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await DBApi.deleteConnection(hostActions.connectionId);
    setIsLoading(false);
    await hostActions.closeDrawer();
  };

  return (
    <div className="host-actions--variants">
      <p>Вы точно хотите удалить подключение?</p>
      <BaseButton loading={isLoading} onClick={onDelete} text="Удалить" />
      <BaseButton text="Назад" onClick={() => hostActions.setDefaultView()} />
      {JSON.stringify(hostActions.setDefaultView)}
    </div>
  );
};

const SqlView = ({ hostActions }: { hostActions: HostActions }) => {
  const [isValid, form, setValue] = useValidationForm({
    action: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  const onAction = async () => {
    setIsLoading(true);
    await DBApi.executeSql(user?.id, hostActions.host, form.action);
    setIsLoading(false);
    hostActions.closeDrawer();
  };

  return (
    <div className="host-actions--variants">
      <BaseInput
        label="Введите команду"
        validation={Validators.required()}
        value={form.action}
        onChange={(event) => setValue("action", event)}
      />
      <BaseButton
        disabled={!isValid}
        onClick={onAction}
        loading={isLoading}
        text="Сохранить"
      />
      <BaseButton text="Назад" onClick={() => hostActions.setDefaultView()} />
    </div>
  );
};

const RenameView = ({ hostActions }: { hostActions: HostActions }) => {
  const [isValid, form, setValue] = useValidationForm({
    name: hostActions.name || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onRename = async () => {
    setIsLoading(true);
    await DBApi.renameConnection(hostActions.connectionId, form.name);
    setIsLoading(false);
    hostActions.closeDrawer();
  };

  return (
    <div className="host-actions--variants">
      <BaseInput
        label="Название"
        validation={Validators.required()}
        value={form.name}
        onChange={(event) => setValue("name", event)}
      />
      <BaseButton
        disabled={!isValid}
        onClick={onRename}
        loading={isLoading}
        text="Сохранить"
      />
      <BaseButton text="Назад" onClick={() => hostActions.setDefaultView()} />
    </div>
  );
};

export const ChangeCredentials = ({
  hostActions,
}: {
  hostActions: HostActions;
}) => {
  const [isValid, form, setForm] = useValidationForm<ICreateConnection>({
    host: hostActions.connectionInfo?.host || '',
    port: hostActions.connectionInfo?.port || '',
    username: hostActions.connectionInfo?.username || '',
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onEditConnection = async () => {
    try {
      setIsLoading(true);
      await DBApi.editConnection(hostActions.connectionId, {
        host: form.host,
        port: form.port,
        username: form.username,
        password: form.password,
      });
      setIsLoading(false);
      hostActions.closeDrawer();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-db">
      <h4>Редактирование подключения</h4>

      <BaseInput
        validation={Validators.required()}
        label="Хост"
        value={form.host}
        onChange={(event) => setForm("host", event)}
      />
      <BaseInput
        validation={[Validators.required(), Validators.onlyNumbers()]}
        label="Порт"
        value={form.port}
        onChange={(event) => setForm("port", event)}
      />
      <BaseInput
        validation={Validators.required()}
        label="Имя пользователя"
        value={form?.username}
        onChange={(event) => setForm("username", event)}
      />
      <BaseInput
        validation={Validators.required()}
        label="Пароль"
        value={form.password}
        type="password"
        onChange={(event) => setForm("password", event)}
      />

      <BaseButton
        text="Сохранить"
        disabled={!isValid}
        onClick={onEditConnection}
        loading={isLoading}
      />
      <BaseButton text="Назад" onClick={() => hostActions.setDefaultView()} />
    </div>
  );
};

const HostActionsButtons = ({
  hostActions,
  status,
}: {
  hostActions: HostActions;
  status: EnTypeLogEnum;
}) => {
  const [isRename, setIsRename] = useState(false);
  const [isMainView, setIsMainView] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isChangeCredentials, setIsChangeCredentials] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isSql, setIsSql] = useState(false);
  const { user, tg } = useTelegram();

  const goBack = () => {
    clearAllViews();
    setIsMainView(true);
  };

  hostActions.setDefaultViewFn = goBack;

  useEffect(() => {
    tg.ready();
    return () => {
      clearAllViews();
      setIsMainView(true);
    };
  }, []);

  const onReload = async () => {
    setIsReloading(true);
    await DBApi.reloadDb(user?.id, hostActions.host);
    setIsReloading(false);
    hostActions.closeDrawer();
  };

  const clearAllViews = () => {
    setIsRename(false);
    setIsChangeCredentials(false);
    setIsDelete(false);
    setIsMainView(false);
    setIsSql(false);
  };

  const onSQLInject = () => {
    clearAllViews();
    setIsSql(true);
  };

  const onRename = () => {
    clearAllViews();
    setIsRename(true);
  };

  const onDelete = () => {
    clearAllViews();
    setIsDelete(true);
  };

  const onChangeCredentials = () => {
    clearAllViews();
    setIsChangeCredentials(true);
  };

  if (isSql) {
    return <SqlView hostActions={hostActions} />;
  }

  if (isDelete) {
    return <DeleteView hostActions={hostActions} />;
  }

  if (isChangeCredentials) {
    return <ChangeCredentials hostActions={hostActions} />;
  }

  if (isRename) {
    return <RenameView hostActions={hostActions} />;
  }

  if (status === EnTypeLogEnum.HostError && isMainView) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" onClick={onRename} />
        <BaseButton
          text="Перезагрузить хост"
          loading={isReloading}
          onClick={onReload}
        />
        <BaseButton
          text="Изменить данные подключения"
          onClick={onChangeCredentials}
        />
        <BaseButton text="Удалить подключение" onClick={onDelete} />
      </div>
    );
  }

  if (status === EnTypeLogEnum.HostOk && isMainView) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" onClick={onRename} />
        <BaseButton
          text="Перезагрузить хост"
          loading={isReloading}
          onClick={onReload}
        />
        <BaseButton
          text="Изменить данные подключения"
          onClick={onChangeCredentials}
        />
        <BaseButton text="Выполнить команду" onClick={onSQLInject} />
        <BaseButton text="Удалить подключение" onClick={onDelete} />
      </div>
    );
  }
};

const HostActionSelect = (props: ISelectedHost) => {
  const hostActions = new HostActions(
    props.closeDrawerFn,
    props.connectionId,
    props.name,
    props.host
  );
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getConnection = async () => {
    try {
      setIsDataLoading(true);
      await hostActions.getConnectionInfo();
    }
    catch (error) {
      console.error(error)
      hostActions.closeDrawer();
    }
    finally {
      setIsDataLoading(false);
    }
  }

  useEffect(() => {
    getConnection();
  }, []);

  if (isDataLoading) {
    return (
      <div className="add-db">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h4>Выберите действие для {props.name}</h4>
      <HostActionsButtons
        hostActions={hostActions}
        status={props.status}
      />
    </>
  );
};

export default HostActionSelect;
