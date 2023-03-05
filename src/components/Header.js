import React from 'react';
import headerLogo from '../images/Vector.svg'

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__link"><img className="header__logo" src={headerLogo} alt="Логотип"/></a>
    </header>
  )
}
export default Header;