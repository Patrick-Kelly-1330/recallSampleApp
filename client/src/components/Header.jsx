import React from 'react';
import Menu from './Menu.jsx';
import BeveragesLogo from '../../dist/beveveragesLogo.png'

const Header = ({
    handleMenuClick,
    handleSetBotVisible,
    handleSetAdminVisible,
    menuVisible,
    handleGetAllMeetings
}) => {
  return (
    <div className="headerContainer">
      <div className="headerCompanyInfoContainer">
        <img src={BeveragesLogo} alt="Logo of beverage company" className="logoImage"/>
        <div>Beverages Unlimited - Sales Training Dashboard</div>
      </div>
      <i onClick={handleMenuClick} className="fa-solid fa-bars fa-2xl"></i>{ menuVisible ?
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
