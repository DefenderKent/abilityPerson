import { Input } from "./../FormContorl/FormControl";
import { required, minLengthCreator } from "./../utilits/validators";
import React from "react";
import style from "./Modal.module.css";
import { Field } from "redux-form";
const minLengthCreator2 = minLengthCreator(2);

const ModalForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        className={`${style.popupfield} ${style.popupinput}`}
        name={"firstName"}
        component={Input}
        placeholder="Введите имя сотрудника"
        validate={[required, minLengthCreator2]}
      />
      <Field
        className={`${style.popupfield} ${style.popupinput}`}
        validate={[required, minLengthCreator2]}
        name={"lastName"}
        component={Input}
        placeholder="Введите фамилию сотрудника"
      />

      <div className={style.fe}>
        <button className={style.save}>Добавить</button>
      </div>
    </form>
  );
};
export default ModalForm;
