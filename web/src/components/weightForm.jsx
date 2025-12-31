import React from "react";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { addNewWeight } from "../services/weightService";

class WeightForm extends Form {
  state = { data: { date: "", weight: "" }, errors: {} };

  schema = {
    date: Joi.date().required().label("Date"),
    weight: Joi.number().required().label("Weight"),
  };

  componentDidMount() {
    this.setState({ data: { date: new Date().toISOString().split("T")[0] } });
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addNewWeight(data);
      window.location.reload();
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    if (!auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "date",
            "Date",
            "date",
            new Date().toISOString().split("T")[0]
          )}
          {this.renderInput("weight", "Weight")}
          {this.renderButton("Log Weight")}
        </form>
      </div>
    );
  }
}

export default WeightForm;
