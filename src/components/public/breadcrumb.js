import React from 'react'
import { Link } from "react-router-dom";

const Breadcrumbs = ({ crumbs }) => {
    // Don't render a single breadcrumb.
    if (crumbs.length <= 1) {
      return null;
    }  return (
      <div className="container text-right my-2 font-gray-color">
        {/* Link back to any previous steps of the breadcrumb. */}
        {crumbs.map(({ name, path }, key) =>
          key + 1 === crumbs.length ? (
            <span key={key} className="mr-1">
                {name}
            </span>
          ) : (
            <span className="mr-1" key={key}>
              <Link to={path}>
                  {name} 
              </Link>
              <span className="mr-1"> / </span>
            </span>
          )
        )}
      </div>
    );
  };export default Breadcrumbs;