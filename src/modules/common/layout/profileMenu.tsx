import { useAuthentication } from "@/modules/auth/hooks";
import { useAppState } from "@/store/index";
import { CustomTooltip } from "@common/tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export function ProfileMenu() {
  const [state] = useAppState();
  const [userFullName, setUserFullName] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuthentication();

  async function handleLogout() {
    logout();
  }

  React.useEffect(() => {
    if (state?.userProfile?.firstName && state?.userProfile?.lastName) {
      setUserFullName(
        state?.userProfile?.firstName + " " + state?.userProfile?.lastName
      );
    }
  }, [state?.userProfile?.firstName, state?.userProfile?.lastName]);

  const navigate = useNavigate();

  return (
    <>
      <CustomTooltip label="Profile Menu" placement="bottom">
        <Box
          display="flex"
          alignItems="center"
          textAlign="center"
          border="1px solid #8a89fa"
          borderRadius={2}
          onClick={handleClick}
        > 
          <Typography color="#8a89fa" fontWeight={600} p={1}>
            {userFullName ? userFullName : ""}
          </Typography>
          <IconButton
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="profile-icon"
              src="/Images/boy.png"
              sx={{ width: 35, height: 35 }}
            />
          </IconButton>
        </Box>
      </CustomTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          // sx: styles.menuStyle,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            alt="profile-icon"
            src="/Images/boy.png"
            sx={{ width: 35, height: 35 }}
          />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

// import { LogOut } from "lucide-react";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/shadcn/index";
// import { useAuthentication } from "@/modules/auth/hooks";

// export function ProfileMenu() {
//   const {logout} = useAuthentication();
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Avatar className="flex items-center justify-center cursor-pointer">
//           <AvatarImage src="https://github.com/shadcn.png" />
//           <AvatarFallback>Neo</AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>

//         <DropdownMenuItem onClick={()=>logout()}>
//           <LogOut />
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
