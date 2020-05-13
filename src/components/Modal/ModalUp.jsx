import React from "react";
import Modal from "react-modal";
import * as axios from "axios";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { setPerson } from "./../../redux/personReducer";
import style from "./Modal.module.css";
import { personAPI } from "../api/api";
import ModalForm from "./ModalForm";
Modal.setAppElement("#root");
const RexuxModalForm = reduxForm({
  form: "getPerson"
})(ModalForm);

const ModalUp = props => {
  const onSubmit = formData => {
    axios.post("http://localhost:3001/person/", {
      firstName: formData.firstName,
      lastName: formData.lastName
    });
    alert("Добавлен, вернитесь к списку сотрудников");
  };
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const close = () => setModalIsOpen(false);
  const open = () => setModalIsOpen(true);

  return (
    <>
      {modalIsOpen === false ? (
        <button className={style.btn} onClick={open}>
          Добавить сотрудника
        </button>
      ) : (
        <div>
          <Modal className={style.popup} isOpen={modalIsOpen}>
            <h2>Title</h2>
            <button
              className={style.btnmod}
              onClick={() =>
                personAPI.getPersons().then(response => {
                  props.setPerson(response.data);
                  close();
                })
              }
            >
              Назад к списку
            </button>
            <RexuxModalForm onSubmit={onSubmit} />

            {/* <button onClick={close}>Отмена</button> */}
          </Modal>
        </div>
      )}
    </>
  );
};
let mapStateToProps = state => {
  return {
    person: state.personsPage.person
  };
};
export default connect(mapStateToProps, { setPerson })(ModalUp);
