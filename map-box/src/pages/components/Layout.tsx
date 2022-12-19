import { AppBar, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavItem } from "../../components";
import { useAppDispatch, useAppSelector } from "../../config";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { logout } from "../../features";

const routes = [
  { path: "/", name: "Home" },
  { path: "/users", name: "Users" },
];

const UserAvatar = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (authStatus !== "authenticated") return null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const Routes = () => {
  const authStatus = useAppSelector((state) => state.auth.status);

  if (authStatus !== "authenticated") return null;

  return (
    <Grid container padding="8px">
      {routes.map((route) => (
        <NavItem key={route.name} path={route.path} name={route.name} />
      ))}
    </Grid>
  );
};

export function MainLayout() {
  return (
    <>
      <AppBar position="static" sx={{ minHeight: "64px" }}>
        <Grid
          container
          justifyContent="space-between"
          justifyItems="center"
          padding="8px"
        >
          <Grid item>
            <Routes />
          </Grid>
          <Grid item>
            <UserAvatar />
          </Grid>
        </Grid>
      </AppBar>
      {/* routes are lazy loaded, so adding suspense here to display placeholder till route chunk is loaded */}
      {/* we can support prefetching if bundles got bigger, just for simplicity I didn't add it here */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
