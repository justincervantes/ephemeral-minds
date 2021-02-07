import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { viewEntry } from "./../services/journalService";
import { modifyEntry } from "../services/journalService";
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

  async componentDidMount() {
    if(window.location.href.includes("new-entry")) {
      const { data: entry } = await viewEntry(this.props.match.params.postid);
      this.setState({ data: { title: entry.title, content: entry.content } });
    }
  }

  doSubmit = async () => {
    try {
      this.state.data["uid"] = auth.getCurrentUser()._id;
      const { data } = this.state;
      data._id = window.location.pathname.split('/')[2];
      if( data._id) {
        await modifyEntry(data);
      } else {
        await saveEntry(data);
      }

      this.props.history.push("/");
      // const { state } = this.props.location;
    
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
