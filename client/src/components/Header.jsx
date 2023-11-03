import React from 'react';
import Menu from './Menu.jsx';

const Header = ({ handleMenuClick, handleSetBotVisible, handleSetAdminVisible, menuVisible, handleGetAllMeetings }) => {

  return (
    <div className="headerContainer">
      <div className="headerCompanyInfoContainer">
        <div onClick={handleGetAllMeetings}>SAMPLE LOGO</div>
        <div>Sample Company Name Sales Training Dashboard</div>
      </div>
      <div onClick={handleMenuClick}>MENU PLACEHOLDER</div>{
        menuVisible ?
        <Menu
          handleMenuClick={handleMenuClick}
          handleSetBotVisible={handleSetBotVisible}
          handleSetAdminVisible={handleSetAdminVisible}
        />
        : null
      }
    </div>
  );
}

export default Header;
