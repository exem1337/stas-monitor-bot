import { useEffect, useState } from "react"
import BaseButton from "../components/ui/BaseButton/BaseButton"
import BaseInput from "../components/ui/BaseInput/BaseInput"
import { useValidationForm } from "../components/ui/utils/useValidationForm"
import { Validators } from "../components/ui/validators/validators.util"
import { useTelegram } from '../hooks/useTelegram'
import { DBApi } from "../services/dbApiService"
import {useNavigate} from "react-router-dom"
import BaseAlert from "../components/ui/BaseAlert/BaseAlert"

const AddDBPage = () => {
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
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [stateResponse, setStateResponse] = useState('')

  useEffect(() => {
    tg.ready();
  }, [])

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
      setStateResponse('')
      navigate('/');
    }
    catch (error) {
      console.log(error.response)
      setStateResponse(error.response.data.message)
    }
    finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="add-db">
      <h4>Создание нового подключения</h4>

      <BaseButton
        text="Назад"
        className="back-button"
        onClick={() => navigate('/')}
      />

      { success &&  
        <BaseAlert 
          text="Подключение успешно создано" 
          variant="success" 
          onClose={() => setSuccess(false)} 
        />
      }

      { error &&  
        <BaseAlert 
          text="Произошла ошибка при подключении" 
          variant="danger" 
          onClose={() => setError(false)} 
        />
      }

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
       <div className={`mt-3 add-db--warning ${!!stateResponse && 'add-db--warning__show' }`}><BaseAlert text={stateResponse} variant={"danger"}/></div>
    </div>
  )
}

export default AddDBPage;
