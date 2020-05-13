import React from "react";

import { setPerson } from "../../redux/personReducer";
import { connect } from "react-redux";
import { personAPI } from "./../api/api";
import Persons from "./Persons";
import { withRouter } from "react-router-dom";

class PersonContainer extends React.Component {
  async componentDidMount() {
    let id = this.props.match.params.id;

    personAPI.getPersons(id).then(response => {
      this.props.setPerson(response.data);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.person !== this.props.person)
      this.setState({
        person: this.props.person
      });
  }
  render() {
    return (
      <div>
        <Persons
          person={this.props.person}
          updatePerson={this.props.updatePerson}
          setPerson={this.props.setPerson}
        />
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    person: state.personsPage.person
  };
};

let WithUrl = withRouter(PersonContainer);
export default connect(mapStateToProps, { setPerson })(WithUrl);
