/** @format */

import NavbarComponent from "./NavbarComponent";

const DefaultComponent = ({ children }: any) => {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
