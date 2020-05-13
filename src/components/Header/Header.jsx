import React from "react";
import style from "./Header.module.css";

const Header = props => {
  return (
    <div className={style.header}>
      <div className={style.name}>
        <strong>Имя</strong>
      </div>
      <div className={style.name}>
        <strong>Фамилия</strong>
      </div>
    </div>
  );
};
export default Header;
