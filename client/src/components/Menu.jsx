import React from 'react';

const Menu = ({ handleMenuClick, handleSetBotVisible, handleSetAdminVisible }) => {

  return (
    <div className="headerMenuContainer">
      <div onClick={handleSetAdminVisible}>Call Dashboard</div>
      <div onClick={handleSetBotVisible}>Send Bot</div>
    </div>
  );
}

export default Menu;
