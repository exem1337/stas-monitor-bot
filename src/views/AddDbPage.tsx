import { useEffect, useState } from "react"
import BaseButton from "../components/ui/BaseButton/BaseButton"
import BaseInput from "../components/ui/BaseInput/BaseInput"
import { useValidationForm } from "../components/ui/utils/useValidationForm"
import { Validators } from "../components/ui/validators/validators.util"
import { useTelegram } from '../hooks/useTelegram'
import { DBApi } from "../services/dbApiService"

const AddDBPage = () => {
  const [isValid, form, setForm] = useValidationForm({
    name: '',
    host: '',
    port: '',
    login: '',
    password: '',
  })
  const { close, tg } = useTelegram();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tg.ready();
  }, [])

  const onCreateConnection = async () => {
    setIsLoading(true);
    await DBApi.createConnection({
      user_id: tg.initDataUnsafe?.user?.id,
      host: form.host,
      port: form.port,
      username: form.login,
      name: form.name
    })
    setIsLoading(false);
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
    </div>
  )
}

export default AddDBPage;
