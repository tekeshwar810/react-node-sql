import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login', { replace: true });
  };

  const userDataRaw = localStorage.getItem('userData');
  let username = '';
  try {
    const parsed = JSON.parse(userDataRaw);
    username = parsed?.username || parsed?.name || '';
  } catch (e) {
    username = userDataRaw || '';
  }

  return (
    <Header style={{ display: 'flex', alignItems: 'justify-between', justifyContent: 'space-between', padding: '0 24px' }}>
      <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginRight: 24 }}>
        <Link to="/products" style={{ color: 'inherit' }}>
          MyStore
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {username ? <div style={{ color: '#fff' }}> <span style={{padding:"0px 5px"}}>Welcome</span>{username}</div> : null}
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
