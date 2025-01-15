import React from "react";
import { Helmet } from "react-helmet";

const Metadata = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>World Of Minifigs - {title}</title>
      </Helmet>
    </>
  );
};

export default Metadata;
