import React from "react";
import style from "./App.module.css";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { compose } from "redux";
import { setPerson } from "./redux/personReducer";
import { withRouter } from "react-router-dom";
import ModalUp from "./components/Modal/ModalUp";

import Header from "./components/Header/Header";
const PersonContainer = React.lazy(() =>
  import("./components/Persons/PersonContainer")
);
class App extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.person !== this.props.person)
      this.setState({
        person: this.props.person
      });
  }
  render() {
    return (
      <div className={style.container}>
        <Header />
        <Route
          path="/persons/:id?"
          render={() => (
            <React.Suspense fallback={<div>Loading...</div>}>
              <PersonContainer />
            </React.Suspense>
          )}
        />
        <ModalUp />
      </div>
    );
  }
}
let mapDispatchToProps = dispatch => {
  return {
    setPerson: person => {
      dispatch(setPerson(person));
    }
  };
};
let mapStateToProps = state => {
  return {
    person: state.personsPage.person
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
