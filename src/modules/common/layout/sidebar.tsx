import { CustomTooltip } from "@common/tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface props {
  menuItems?: Array<any>;
  open: any;
  mode?: string;
}

export function Sidebar(props: props) {
  const iconColor = props.mode === "dark" ? "#FFF" : "";

  const menuItems = [
    {
      id: 1,
      title: "Home",
      icon: <HomeIcon sx={{ color: iconColor }} />,
      link: "/home",
    },
    {
      id: 2,
      title: "Notifications",
      icon: (
        <Badge color="secondary" badgeContent={5}>
          <NotificationsIcon sx={{ color: iconColor }} />
        </Badge>
      ),
      link: "/notifications",
    },
    {
      id: 3,
      title: "Bookmarks",
      icon: <BookmarkIcon sx={{ color: iconColor }} />,
      link: "/bookmarks",
    },
    {
      id: 4,
      title: "Events",
      icon: <CalendarMonthIcon sx={{ color: iconColor }} />,
      link: "/events",
    },
    {
      id: 5,
      title: "Profile",
      icon: <AccountCircleIcon sx={{ color: iconColor }} />,
      link: "/profile",
    },
  ];

  return (
    <List
      id="sidebar-list"
      sx={{
        pt: 2,
        height: "100%",
        backgroundColor: props.mode === "dark" ? "#30303a" : "#FFF",
        borderRight: props.mode === "dark" ? "1px solid #8a89fa" : "#FFFE",
      }}
    >
      {menuItems.map((item) => (
        <Link key={item.id} to={item.link} style={{ color: "#8a89fa" }}>
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: "block", pb: 1 }}
          >
            <CustomTooltip placement="right" label={item.title}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            </CustomTooltip>

            {item.id === 4 && <Divider />}
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
