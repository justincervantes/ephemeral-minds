import Typed from "typed.js";
import React from "react";

export default class Typewriter extends React.Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    const { strings } = this.props;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 80,
      backSpeed: 40,
      loop: false,
      showCursor: false,
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  render() {
    return (
      <div className="wrap">
        <div className="type-wrap">
          <h1
            className="typed-fade-out text-wrap"
            style={{ whiteSpace: "pre", color: "#FFF" }}
            ref={(el) => {
              this.el = el;
            }}
          />
        </div>
      </div>
    );
  }
}
