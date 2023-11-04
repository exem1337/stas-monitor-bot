import { useEffect, useState } from "react";
import { ISelectedHost } from "../../models/db.model";
import BaseButton from "../ui/BaseButton/BaseButton";
import { EnTypeLogEnum } from "../ui/enums/enTypeLog.enum";
import { useValidationForm } from "../ui/utils/useValidationForm";
import BaseInput from "../ui/BaseInput/BaseInput";
import { Validators } from "../ui/validators/validators.util";
import { DBApi } from "../../services/dbApiService";

class HostActions {
  closeDrawer = null;
  connectionId = null;
  setDefaultView = null;
  name = null;
  
  constructor(closeDrawerFn: () => void, connectionId: number, name: string) {
    this.closeDrawer = closeDrawerFn;
    this.connectionId = connectionId;
  }

  set setDefaultViewFn(fn: () => void) {
    this.setDefaultView = fn;
  }
}

const DeleteView = ({ hostActions }: { hostActions: HostActions }) => {
  return (
    <div className="host-actions--variants">
      <p>Вы точно хотите удалить подключение?</p>
      <BaseButton 
        
        text="Удалить" 
      />
      <BaseButton 
        text="Назад" 
        onClick={() => hostActions.setDefaultView()}
      />
    </div>
  )
}

const RenameView = ({ hostActions }: { hostActions: HostActions }) => {
  const [isValid, form, setValue] = useValidationForm({
    name: hostActions.name
  })
  const [isLoading, setIsLoading] = useState(false);

  const onRename = async () => {
    setIsLoading(true);
    await DBApi.renameConnection(hostActions.connectionId, form.name);
    setIsLoading(false);
  }

  return (
    <div className="host-actions--variants">
      <BaseInput 
        label="Название"
        validation={Validators.required()}
        value={form.name}
        onChange={(event) => setValue('name', event)} 
      />
      <BaseButton 
        disabled={!isValid}
        onClick={onRename}
        loading={isLoading}
        text="Сохранить" 
      />
      <BaseButton 
        text="Назад" 
        onClick={() => hostActions.setDefaultView()}
      />
    </div>
  )
}

export const ChangeCredentials = ({ hostActions }: { hostActions: HostActions }) => {
  const [isValid, form, setForm] = useValidationForm({
    name: '',
    host: '',
    port: '',
    login: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false);

  const onCreateConnection = async () => {
    try {
      setIsLoading(true);
      await DBApi.createConnection({
        host: form.host,
        port: form.port,
        username: form.login,
        name: form.name,
        password: form.password
      })
    }
    catch (error) {
      
    }
    finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="add-db">
      <h4>Редактирование подключения</h4>
      
      <BaseInput 
        validation={Validators.required()}
        label="Название подключения"
        value={form.name}
        onChange={(event) => setForm('name', event)}
      />
      <BaseInput 
        validation={Validators.required()}
        label="Хост"
        value={form.host}
        onChange={(event) => setForm('host', event)}
      />
      <BaseInput 
        validation={[Validators.required(), Validators.onlyNumbers()]}
        label="Порт"
        value={form.port}
        onChange={(event) => setForm('port', event)}
      />
      <BaseInput 
        validation={Validators.required()}
        label="Имя пользователя"
        value={form.login}
        onChange={(event) => setForm('login', event)}
      />
      <BaseInput 
        validation={Validators.required()}
        label="Пароль"
        value={form.password}
        type="password"
        onChange={(event) => setForm('password', event)}
      />
      <BaseButton 
        text="Создать" 
        disabled={!isValid}
        onClick={onCreateConnection}
        loading={isLoading}
      />
      <BaseButton 
        text="Назад" 
        onClick={() => hostActions.setDefaultView()}
      />
    </div>
  )
}

const HostActionsButtons = ({ hostActions, name, status }: { hostActions: HostActions, name: string, status: EnTypeLogEnum }) => {
  const [isRename, setIsRename] = useState(false);
  const [isMainView, setIsMainView] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isChangeCredentials, setIsChangeCredentials] = useState(false);

  const goBack = () => {
    clearAllViews();
    setIsMainView(true);
  }

  hostActions.setDefaultViewFn = goBack;

  useEffect(() => {
    return () => {
      clearAllViews();
      setIsMainView(true);
    }
  },[])
  
  const clearAllViews = () => {
    setIsRename(false);
    setIsChangeCredentials(false)
    setIsMainView(false);
  }

  const onRename = () => {
    clearAllViews();
    setIsRename(true);
  }

  const onDelete = () => {
    clearAllViews();
    setIsDelete(true);
  }

  if (isDelete) {
    return (
      <DeleteView hostActions={hostActions} />
    )
  }

  if (isChangeCredentials) {
    return (
      <ChangeCredentials hostActions={hostActions} />
    )
  }

  if (isRename) {
    return (
      <RenameView hostActions={hostActions} />
    )
  }

  if (status === EnTypeLogEnum.HostError && isMainView) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" onClick={onRename} />
        <BaseButton text="Перезагрузить хост" />
        <BaseButton text="Изменить данные подключения" />
        <BaseButton text="Удалить подключение" onClick={onDelete} />
      </div>
    )
  }

  if (status === EnTypeLogEnum.HostOk && isMainView) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" onClick={onRename} />
        <BaseButton text="Перезагрузить хост" />
        <BaseButton text="Изменить данные подключения" />
        <BaseButton text="Удалить подключение" onClick={onDelete} />
      </div>
    )
  }
}

const HostActionSelect = (props: ISelectedHost) => {
  const hostActions = new HostActions(props.closeDrawerFn, props.connectionId, props.name);

  return (
    <>
      { hostActions.name }
      <h4>Выберите действие для { props.name }</h4>
      <HostActionsButtons hostActions={hostActions} status={props.status} name={props.name} />
    </>
  )
}

export default HostActionSelect;