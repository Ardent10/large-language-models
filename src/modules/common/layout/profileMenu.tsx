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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileMenu() {
  const [state] = useAppState();
  const [userData, setUserData] = useState({ fullName: "", email: "" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
      setUserData({
        fullName: `${state?.userProfile?.firstName} ${state?.userProfile?.lastName}`,
        email: state?.userProfile?.email,
      });
    }
  }, [state?.userProfile?.firstName, state?.userProfile?.lastName]);

  const navigate = useNavigate();

  return (
    <>
      <CustomTooltip label="Profile Menu" placement="bottom">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt="profile-icon"
            src="/assets/user.jpg"
            sx={{ width: 35, height: 35 }}
          />
        </IconButton>
      </CustomTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          className: "",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box className="flex flex-col  px-4">
          <Typography fontSize={16} p={1}>
            {userData ? userData.fullName : ""}
          </Typography>
          <Typography fontSize={16} p={1}>
            {userData ? userData.email : ""}
          </Typography>
          <Divider />
        </Box>
        <MenuItem onClick={handleClose}>
          <Typography fontSize={16} px={1}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography fontSize={16} px={1}>
            Account Settings
          </Typography>
        </MenuItem>
        <Box px={4}>
          <Divider />
        </Box>

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
