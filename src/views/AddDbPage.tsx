import BaseButton from "../components/ui/BaseButton/BaseButton"
import BaseInput from "../components/ui/BaseInput/BaseInput"
import { useValidationForm } from "../components/ui/utils/useValidationForm"
import { Validators } from "../components/ui/validators/validators.util"

const AddDBPage = () => {
  const [isValid, form, setForm] = useValidationForm({
    host: '',
    login: '',
    password: '',
  })
  
  return (
    <div className="add-db">
      <h4>Создание нового подключения</h4>
      <BaseInput 
        validation={Validators.required()}
        label="Хост"
        value={form.host}
        onChange={(event) => setForm('host', event)}
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
      />
    </div>
  )
}

export default AddDBPage;
