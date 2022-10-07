import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';
import DefaultLayout from '../components/layout/DefaultLayout';

function ResponsiveAppBar() {
  return (
    <React.Fragment>
      <DefaultLayout style={{ color: 'red' }}>
        <React.Fragment>
          <h1>妊娠中サポートできるアプリ作成中</h1>
          <p>
            ログインした状態であれば、ここに出産までのカウントダウンが表示されるようにしたいです。
          </p>
        </React.Fragment>
      </DefaultLayout>
    </React.Fragment>
  );
}
export default ResponsiveAppBar;
