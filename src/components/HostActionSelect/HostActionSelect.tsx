import { ISelectedHost } from "../../models/db.model";
import BaseButton from "../ui/BaseButton/BaseButton";
import { EnTypeLogEnum } from "../ui/enums/enTypeLog.enum";

const HostActionsButtons = ({ status }: { status: EnTypeLogEnum }) => {
  if (status === EnTypeLogEnum.HostError) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Перезагрузить хост" />
        <BaseButton text="Изменить данные подключения" />
      </div>
    )
  }

  if (status === EnTypeLogEnum.HostOk) {
    return (
      <div className="host-actions--variants">
        <BaseButton text="Переименовать подключение" />
        <BaseButton text="Перезагрузить хост" />
        <BaseButton text="Изменить данные подключения" />
      </div>
    )
  }
}

const HostActionSelect = (props: ISelectedHost) => {
  return (
    <>
      <h4>Выберите действие для { props.name }</h4>
      <HostActionsButtons status={props.status} />
    </>
  )
}

export default HostActionSelect;