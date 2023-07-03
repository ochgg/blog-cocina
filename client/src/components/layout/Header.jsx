import React from "react";

export const Header = () => {
  return (

    <header className="header">
      <img src={process.env.PUBLIC_URL + "/logo4.png"} className="logo-img img-fluid" alt="logo" />
    </header>

  );
};