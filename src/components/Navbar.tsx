// Config
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { appName } from '@/config/constants/app'

// MUI
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const pointer = {
  cursor: 'pointer'
}

const Navbar: React.FC = () => {
  const router = useRouter()
  const [drawer, setDrawer] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [walletConnectModal, setWalletConnectModal] = useState<boolean>(false)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appName}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Button color="primary" variant="contained" onClick={() => setWalletConnectModal(true)}>Connect Wallet</Button>
          </Stack>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setWalletConnectModal(true)}>Connect Wallet</MenuItem>
      </Menu>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem
              key="dashboard"
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" onClick={() => router.push('/')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Modal
        open={walletConnectModal}
        onClose={() => setWalletConnectModal(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
          >
            Connect wallet
          </Typography>

          <List>
            <ListItem
              sx={pointer}
              onClick={() => console.log('テスト')}
            >
              <ListItemText>
                Metamask
              </ListItemText>
              <ListItemAvatar>
                <Avatar alt="Metamask" src="/metamask.svg" />
              </ListItemAvatar>
            </ListItem>
            <ListItem>
              <ListItemText>
              Other wallets coming soon...
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  )
}

export default Navbar
