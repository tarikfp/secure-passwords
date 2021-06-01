import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section id="not-found">
      <div class="circles">
        <p>
          404
          <br />
          <small>PAGE NOT FOUND</small>
          <br />
          <Link to="/">
            <small>GO TO HOME PAGE</small>
          </Link>
        </p>
        <span class="circle big"></span>
        <span class="circle med"></span>
        <span class="circle small"></span>
      </div>
    </section>
  );
};

export default NotFound;
