import React from 'react';

const Menu = ({ handleMenuClick, handleSetBotVisible, handleSetAdminVisible }) => {

  return (
    <div className="headerMenuContainer">
      <div className="headerMenuItem" onClick={handleSetAdminVisible}>Call Dashboard</div>
      <div className="headerMenuItem" onClick={handleSetBotVisible}>Send Bot</div>
    </div>
  );
}

export default Menu;
