import React from "react";
import { MenuButton } from "../../molecules";
import { Button } from "../../atoms";

const Menu = ({ data, handler, hanlderAuth, isAuth }) => {
  const handleAuth = () => {
    hanlderAuth(!isAuth);
  };

  return (
    <div>
      {data.map((x, i) => {
        let { icon, text, value } = x;
        return (
          <MenuButton key={i} handler={handler} icon={icon} data={value}>
            {text}
          </MenuButton>
        );
      })}
      <Button
        onClick={handleAuth}
        text={isAuth ? "Logout" : "Auth | Register"}
      />
    </div>
  );
};

export default Menu;
