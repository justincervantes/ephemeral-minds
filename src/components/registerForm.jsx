import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import ImageSelector from "./ImageSelector";
import { addNewWeight } from '../services/weightService';
import http from "../services/httpService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "", imageUrl: "" },
    errors: {},
  };
  componentDidMount() {
    document.getElementById("imageUrl").readOnly = true;
  }

  images = {
    img1: "/img/dashboard/health1.jpg",
    img2: "/img/dashboard/health2.jpg",
    img3: "/img/dashboard/health3.jpg",
    img4: "/img/dashboard/motivation1.jpg",
    img5: "/img/dashboard/motivation2.jpg",
    img6: "/img/dashboard/motivation3.jpg",
    img7: "/img/dashboard/love1.jpg",
    img8: "/img/dashboard/love2.jpg",
    img9: "/img/dashboard/love3.jpg",
  };

  handleImageSelected = (e) => {
    let images = document.getElementsByClassName("img-thumbnail");
    for (let image of images) {
      image.setAttribute("class", "image-fluid img-thumbnail");
      image.setAttribute("style", "border-width: 1px");
    }
    e.currentTarget.setAttribute(
      "class",
      "border border-primary image-fluid img-thumbnail"
    );
    e.currentTarget.setAttribute("style", "border-width: 3px");
    let slugIndex = e.currentTarget.src.split("/").length - 1;
    let imageUrl = e.currentTarget.src.split("/")[slugIndex];
    let inputBox = document.getElementById("imageUrl");
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(inputBox, imageUrl);
    var ev2 = new Event("change", { bubbles: true });
    inputBox.dispatchEvent(ev2);
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    currentWeight: Joi.number().label("Current Weight"),
    imageUrl: Joi.string().required().label("Image URL"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderInput("imageUrl", "Dashboard Image")}
          <ImageSelector
            images={this.images}
            handleClick={this.handleImageSelected}
            currentTarget=""
          />
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
