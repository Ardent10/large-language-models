import { useAppState } from "@/store";
import { NavbarMenu } from "@/utils/constants";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { ExpandMore } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Collapse,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Logo } from "./logo";
import { ProfileMenu } from "./profileMenu";
// import { CustomTooltip } from "../tooltip";
// import { DarkMode } from "@common/theme";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LoginIcon from "@mui/icons-material/Login";

interface HeaderProps {
  mode: string;
}

export function Header(props: HeaderProps) {
  const [state] = useAppState();
  const navigate = useNavigate();

  const [toggleMobileMenu, setToggleMobileMenu] = React.useState(false);

  const handleMobileMenuChange = () => {
    setToggleMobileMenu((prev) => !prev);
  };

  const githubIconColor = props.mode === "dark" ? "#FFF" : "#000";
  return (
    <>
      {/* <AppBar
        position="absolute"
        className="flex absolute top-4 bg-none left-8  w-[95%] bg-transparent bg-opacity-50 backdrop-blur-lg z-10 items-center justify-between  border border-green-600 rounded-xl lg:px-7.5 xl:px-4 max-lg:py-4"
      >
        <Container>
          <Toolbar className="flex justify-between w-full px-2">

            <IconButton onClick={handleMobileMenuChange}>
              <MenuOpenIcon
                className="hidden xs:flex sm:none md:none"
                fontSize="large"
              />
            </IconButton>
            <Collapse in={toggleMobileMenu} timeout="auto" unmountOnExit>
              <Navbar />
            </Collapse>


            <Logo />
            <Box
              id="main-navigation"
              // className="items-center justify-between w-1/3 xs:hidden sm:hidden md:flex"
              className="items-center justify-between w-1/3 hidden md:flex"
            >
              <Navbar />
            </Box>

            <Box
              id="header-buttons"
              className="flex items-center justify-center"
            >
              <CustomTooltip placement="bottom" label="⭐ Star on Github">
                <IconButton
                  size="medium"
                  href="https://github.com/Ardent10/large-language-models"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon
                    sx={{ color: githubIconColor }}
                    fontSize="large"
                  />
                </IconButton>
              </CustomTooltip>
              <DarkMode />
              {!state?.userProfile?.id ? (
                <Link
                  to="/login"
                  className={
                    "rounded-sm  border-black bg-black  hover:bg-[#40be35f7] border px-2 py-1 hover:border-green-600"
                  }
                >
                  <Button
                    className="text-white text-sm capitalize dark:text-green-700  "
                    endIcon={<LoginIcon />}
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <ProfileMenu />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}

      {/* --------------- */}
      <AppBar
        position="absolute"
        className="flex absolute top-4 sm:left-2 md:left-8 lg:left-10 w-[95%] bg-none bg-transparent bg-opacity-50 backdrop-blur-lg z-10 items-center justify-between border border-green-600 rounded-xl xs:py-1 lg:px-7.5 xl:px-4"
      >
        <Toolbar className="w-full px-0">
          <Box
            className="w-full "
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuChange}
              color="inherit"
              className="xs:flex md:flex lg:hidden xl:hidden"
            >
              <MenuIcon />
            </IconButton>
            <Collapse in={toggleMobileMenu} timeout="auto" unmountOnExit>
              <Navbar />
            </Collapse>
            {/* <Menu
                id="menu-appbar"
                anchorEl={toggleMobileMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(toggleMobileMenu)}
                onClose={toggleMobileMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {NavbarMenu.map((navItem) => (
                  <MenuItem key={navItem.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{navItem.title}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
          </Box>
          <Box className="w-full flex justify-between items-center">
            <Box>
              <Logo />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Navbar />
            </Box>

            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

const Navbar = () => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex  justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px]  p-1 ">
        {NavbarMenu.map((navItem) => (
          <React.Fragment key={navItem.title}>
            <NavigationMenu.Item>
              <Link to={navItem.href} >
                <NavigationMenu.Trigger className="decoration-2 decoration-green-600 hover:underline text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none hover:text-decoration-line">
                  {navItem.title}
                  <ExpandMore
                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                    aria-hidden
                  />
                </NavigationMenu.Trigger>
              </Link>
              <NavigationMenu.Content
                className="flex sm:flex-col  rounded data-[motion=from-start]:animate-enterFromLeft
              data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft
              data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
              >
                <ul className="sm:flex-col  one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
                  <li className="row-span-3 grid">
                    <NavigationMenu.Link asChild>
                      <Link
                        className="focus:shadow-violet7 from-purple9 to-indigo9 flex border border-green-600
                    h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b  no-underline outline-none focus:shadow-[0_0_0_2px]"
                        to="/"
                      >
                        <img src={navItem.icon} alt="nav-icon" />
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                  {navItem.submenu.map((submenuItem) => (
                    <Box
                      key={submenuItem.submenuLabel}
                      className="hover:bg-[#a7f24a] rounded  my-2 w-4/5"
                    >
                      <Link to={navItem.href}>
                        <ListItem
                          key={submenuItem.submenuLabel}
                          title={submenuItem.submenuLabel}
                        >
                          {submenuItem.description}
                        </ListItem>
                      </Link>
                    </Box>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-black" />
            </NavigationMenu.Indicator>
          </React.Fragment>
        ))}
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-black transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          ref={ref}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
