import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../assets/images/logo.svg";
import profileImg from "../assets/images/profile.jpg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import CicularProgress from "@material-ui/core/CircularProgress";
// actions
import logout from "../config/redux/actions/logout";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: [16, 18],
    position: "relative",
  },
  menu: {
    marginLeft: "auto",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& .profile-img": {
      width: 32,
      height: 32,
      overflow: "hidden",
      borderRadius: 8,
      backgroundColor: theme.palette.neutral.lightGray,
      [theme.breakpoints.up("md")]: {
        marginRight: 8,
      },
      "& img": {
        width: "100%",
      },
      "& svg": {
        color: "white",
        width: "100%",
        height: "100%",
      },
    },
  },
  popover: {
    "& .MuiPopover-paper": {
      border: "1px solid #E0E0E0",
      borderRadius: 12,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
    },
  },
  nav: {
    width: 192,
    padding: 12,
    "& .MuiListItem-root": {
      borderRadius: 8,
      "&.logout": {
        color: theme.palette.secondary.main,
        "& .MuiListItemIcon-root": {
          color: theme.palette.secondary.main,
        },
      },
    },
    "& .Mui-selected": {
      backgroundColor: "#F2F2F2",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
      "& svg": {
        width: 22,
      },
    },
    "& .MuiListItemText-primary": {
      fontSize: 12,
    },
    "& .MuiDivider-root": {
      marginBottom: 8,
    },
  },
  name: {
    display: "none",
    fontSize: 12,
    fontWeight: 700,
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
    },
  },
  dropdownIcon: {
    display: "none",
    "&.open": {
      transform: "rotate(180deg)",
    },
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
    },
  },
  login: {
    marginLeft: "auto",
    "&:hover": {
      textDecoration: "none",
    },
    "&.disabled": {
      cursor: "not-allowed",
      "& .MuiButton-root": {
        cursor: "inherit",
      },
    },
    "& .MuiButton-root": {
      backgroundColor: theme.palette.neutral.darkGray,
      color: "white",
      "&:hover": {
        backgroundColor: "black",
      },
    },
  },
  loadingButton: {
    color: "white",
    // position: "absolute",
  },
}));

function Header({ className, isLogin, logout, user, loadingUser }) {
  const styles = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogout() {
    logout();
  }
  function handleClickLogin() {
    history.push(`/login`);
  }
  function handleClickMyProfile() {
    history.push(`/profile/${user.uid}`);
  }
  return (
    <header className={clsx(styles.root, className)}>
      <img src={logo} alt="" />
      {isLogin ? (
        <div className={styles.menu} onClick={handleClick} role="button">
          <div className="profile-img">
            {user.photoUrl ? (
              <img src={user.photoUrl} alt="" />
            ) : (
              <PersonIcon />
            )}
          </div>
          <span className={styles.name}>
            {user.displayName ? user.displayName : user.email}
          </span>
          <ArrowDropDownIcon
            className={clsx(styles.dropdownIcon, open ? "open" : "close")}
          />
        </div>
      ) : (
        <Link
          to={loadingUser ? null : "/login"}
          className={clsx(styles.login, loadingUser ? "disabled" : null)}
        >
          <Button variant="contained" disableElevation size="small">
            {loadingUser ? (
              <CicularProgress size={18} className={styles.loadingButton} />
            ) : (
              "Login"
            )}
          </Button>
        </Link>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: "right",
        }}
        className={styles.popover}
      >
        <List className={styles.nav} component="nav">
          <ListItem
            onClick={() => {
              handleClickMyProfile();
              handleClose();
            }}
            button
            selected
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Group Chat</ListItemText>
          </ListItem>
          <Divider />
          <ListItem
            button
            className="logout"
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </header>
  );
}
function mapState(state) {
  return {
    isLogin: state.auth.login,
    user: state.user,
    loadingUser: state.loadings.user,
  };
}
function mapDispatch(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapState, mapDispatch)(Header);
