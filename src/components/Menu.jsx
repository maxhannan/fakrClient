import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="huge">
      <Menu.Item name={user.username} as={Link} to="/" active />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="huge">
      <Menu.Item
        name="home"
        as={Link}
        to="/"
        active={activeItem === 'home'}
        onClick={handleClick}
      />

      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/login"
          name="login"
          active={activeItem === 'login'}
          onClick={handleClick}
        />
        <Menu.Item
          name="register"
          as={Link}
          to="/register"
          active={activeItem === 'register'}
          onClick={handleClick}
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;
