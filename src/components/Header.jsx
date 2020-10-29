import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
    "& .profile-img": {
      width: 32,
      height: 32,
      overflow: "hidden",
      borderRadius: 8,
      "& img": {
        width: "100%",
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
  },
}));

export default function Header({ className }) {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <header className={clsx(styles.root, className)}>
      <img src={logo} alt="" />
      <div className={styles.menu} onClick={handleClick} role="button">
        <div className="profile-img">
          <img src={profileImg} alt="" />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: "center",
        }}
        className={styles.popover}
      >
        <List className={styles.nav} component="nav">
          <ListItem button selected>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Group Chat</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button className="logout">
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
