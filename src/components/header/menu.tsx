import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../auth/authService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logoutMutation } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    logoutMutation.mutate();
    navigate(ROUTES.LoginPage);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user ? user.name : ''}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profilis</MenuItem>
        <MenuItem onClick={logOut}>Atsijungti</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
