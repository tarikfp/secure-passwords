import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/4b9ba14b0f.js"
          crossorigin="anonymous"></script>
      </head>
      <body>
        <div class="mainbox">
          <div class="err">4</div>
          <div class="err3">0</div>
          <div class="err2">4</div>
          <div class="msg">
            Maybe this page moved? Got deleted? Is hiding out in quarantine?
            Never existed in the first place?
            <p>
              Let's go <Link to="/">home</Link> and try from there.
            </p>
          </div>
        </div>
      </body>
    </React.Fragment>
  );
};

export default NotFound;
