import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { saveEntry } from "../services/journalService";
class JournalEntryForm extends Form {
  state = {
    data: { title: "", content: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
  };

  doSubmit = async () => {
    try {
      this.state.data["uid"] = auth.getCurrentUser()._id;
      const { data } = this.state;
      console.log(data);
      const result = await saveEntry(data);
      console.log(result);
      this.props.history.push("/");
      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error();
      }
    }
  };

  render() {
    return (
      <div>
        <h1>New Journal Entry</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderTextArea("content", "Content", 10)}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default JournalEntryForm;
