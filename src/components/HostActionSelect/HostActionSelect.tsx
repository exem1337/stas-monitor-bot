import { useEffect, useState } from "react";
import { ISelectedHost } from "../../models/db.model";
import BaseButton from "../ui/BaseButton/BaseButton";
import { EnTypeLogEnum } from "../ui/enums/enTypeLog.enum";
import { useValidationForm } from "../ui/utils/useValidationForm";
import BaseInput from "../ui/BaseInput/BaseInput";
import { Validators } from "../ui/validators/validators.util";
import { useTelegram } from '../../hooks/useTelegram';
import { DBApi } from "../../services/dbApiService";

const DeleteView = ({ connectionId, goBackFn }: { connectionId: number, goBackFn: () => void }) => {
  return (
    <div className="host-actions--variants">
      <p>Вы точно хотите удалить подключение?</p>
      <BaseButton 
        
        text="Удалить" 
      />
      <BaseButton 
        text="Назад" 
        onClick={goBackFn}
      />
    </div>
  )
}

const RenameView = ({ host, goBackFn }: { host: string, goBackFn: () => void }) => {
  const [isValid, form, setValue] = useValidationForm({
    name: ''
  })

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
        text="Сохранить" 
      />
      <BaseButton 
        text="Назад" 
        onClick={goBackFn}
      />
    </div>
  )
}

export const ChangeCredentials = ({ goBackFn }: { goBackFn: () => void }) => {
  const [isValid, form, setForm] = useValidationForm({
    name: '',
    host: '',
    port: '',
    login: '',
    password: '',
  })
  const { tg } = useTelegram();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onCreateConnection = async () => {
    try {
      setIsLoading(true);
      await DBApi.createConnection({
        telegram_id: tg.initDataUnsafe?.user?.id?.toString(),
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
      <h4>Создание нового подключения</h4>
      
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
        onClick={goBackFn}
      />
    </div>
  )
}

const HostActionsButtons = (props: ISelectedHost) => {
  const [isRename, setIsRename] = useState(false);
  const [isMainView, setIsMainView] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [isChangeCredentials, setIsChangeCredentials] = useState(false);
  const { tg } = useTelegram();
  
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

  const goBack = () => {
    clearAllViews();
    setIsMainView(true);
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
      <DeleteView connectionId={1} goBackFn={goBack} />
    )
  }

  if (isChangeCredentials) {
    return (
      <ChangeCredentials goBackFn={goBack} />
    )
  }

  if (isRename) {
    return (
      <RenameView host={props.name} goBackFn={goBack} />
    )
  }

  if (props.status === EnTypeLogEnum.HostError && isMainView) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" onClick={onRename} />
        <BaseButton text="Перезагрузить хост" />
        <BaseButton text="Изменить данные подключения" />
        <BaseButton text="Удалить подключение" onClick={onDelete} />
      </div>
    )
  }

  if (props.status === EnTypeLogEnum.HostOk && isMainView) {
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
  return (
    <>
      <h4>Выберите действие для { props.name }</h4>
      <HostActionsButtons status={props.status} name={props.name} />
    </>
  )
}

export default HostActionSelect;