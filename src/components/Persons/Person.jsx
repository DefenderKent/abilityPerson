import React from "react";
import Modal from "react-modal";
import style from "./Person.module.css";
import { personAPI } from "./../api/api";
import * as axios from "axios";

import { Input } from "./../FormContorl/FormControl";
import { required, minLengthCreator } from "./../utilits/validators";
Modal.setAppElement("#root");

class Person extends React.Component {
  state = {
    editMode: false,
    showModal: false,
    showPopup: false,
    id: this.props.id,
    firstName: this.props.firstName,
    lastName: this.props.lastName
  };
  componentDidMount() {}
  getModal = () => {
    this.setState({
      showModal: true
    });
  };
  getPopup = () => {
    this.setState({
      showPopup: true
    });
    this.deletePerson();
  };
  hideModal = () => {
    this.setState({
      showModal: false
    });
  };
  hidePopup = () => {
    this.setState({
      showPopup: false
    });
  };
  activeMode = () => {
    this.setState({
      editMode: true
    });
  };
  deactiveMode = () => {
    this.setState({
      editMode: false
    });
    axios.put(`http://localhost:3001/person/${this.state.id}`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    // this.props.updatePerson(this.state.firstName);
  };
  onfirstName = e => {
    this.setState({
      firstName: e.currentTarget.value
    });
  };
  onlastName = e => {
    this.setState({
      lastName: e.currentTarget.value
    });
  };
  deletePerson = () => {
    axios.delete(`http://localhost:3001/person/${this.state.id}`);
  };
  minLengthCreator2 = minLengthCreator(2);
  render() {
    return (
      <div className={style.wrap}>
        <div className={style.name}>
          <img
            className={style.images}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuRBFgBGO67Dxq9V-9vR3SsKBAhssT5hiqKsSFtK4jxuTkRxd1"
            alt=""
          />
          {this.props.firstName}
        </div>

        <div className={style.lastname}>
          <div>{this.props.lastName}</div>
          <div>
            <button
              className={style.pancil}
              onClick={() => this.getModal()}
            ></button>
            <button
              className={style.pancil2}
              onClick={() => this.getPopup()}
            ></button>
          </div>
        </div>
        <Modal isOpen={this.state.showPopup}>
          <h2>Сотрудник удален!</h2>
          <div className={style.fs}>
            <button
              className={style.save}
              onClick={() => {
                personAPI.getPersons().then(async response => {
                  await this.props.setPerson(response.data);
                  this.hidePopup();
                });
              }}
            >
              Ок
            </button>
          </div>
        </Modal>
        <Modal className={style.popup} isOpen={this.state.showModal}>
          <div>
            <h2>Редактировать</h2>
            <button
              className={style.btnmod}
              onClick={() =>
                personAPI.getPersons().then(response => {
                  this.props.setPerson(response.data);
                  this.hideModal();
                })
              }
            >
              Назад к списку
            </button>
            {this.state.editMode ? (
              <input
                className={`${style.popupfield} ${style.popupinput}`}
                onBlur={this.deactiveMode.bind(this)}
                validate={[required, this.minLengthCreator2]}
                component={Input}
                onChange={this.onfirstName}
                value={this.state.firstName}
              />
            ) : (
              <input
                className={`${style.popupfield} ${style.popupinput}`}
                onClick={this.activeMode.bind(this)}
                value={this.state.firstName}
              />
            )}
          </div>
          <div>
            {this.state.editMode ? (
              <input
                className={`${style.popupfield} ${style.popupinput}`}
                type="text"
                onBlur={this.deactiveMode.bind(this)}
                value={this.state.lastName}
                onChange={this.onlastName}
              />
            ) : (
              <input
                className={`${style.popupfield} ${style.popupinput}`}
                onClick={this.activeMode.bind(this)}
                value={this.state.lastName}
              />
            )}
          </div>

          <div className={style.fe}>
            <button
              className={style.save}
              onClick={() =>
                personAPI.getPersons().then(async response => {
                  await this.props.setPerson(response.data);
                  this.hideModal();
                })
              }
            >
              Сохранить
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Person;
