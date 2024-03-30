import { useAppState } from "@/store";
import { NavbarMenu } from "@/utils/constants";
import { ExpandMore } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AppBar, Box, Collapse, IconButton, Toolbar } from "@mui/material";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./logo";
import { ProfileMenu } from "./profileMenu";

interface HeaderProps {
  mode: string;
}

export function Header(props: HeaderProps) {
  const [state] = useAppState();
  const [navbarFilterByUserType, setNavbarMenu] = React.useState(NavbarMenu);
  const [toggleMobileNavbar, setToggleMobileNavbar] =
    React.useState<boolean>(false);

  const handleToggleMobileNavbar = (event: React.MouseEvent<HTMLElement>) => {
    setToggleMobileNavbar((prev) => !prev);
  };

  useEffect(() => {
    if (state?.userProfile?.user_type === "provider") {
      setNavbarMenu(NavbarMenu);
    } else {
      setNavbarMenu(NavbarMenu.filter((item) => item.title !== "Create"));
    }
  }, [state?.userProfile?.user_type]);

  return (
    <AppBar
      position="absolute"
      className="flex absolute top-4 right-[0.5rem] sm:right-0 sm:left-2 md:left-8 lg:left-10 w-[95%] bg-none bg-transparent bg-opacity-50 backdrop-blur-lg z-10 items-center justify-between border border-green-600 rounded-xl xs:py-1 lg:px-7.5 xl:px-4"
    >
      <Toolbar className="flex flex-col sm:flex-row md:flex w-full px-0 py-2">
        <Box className="w-full flex justify-between items-center">
          <IconButton
            size="large"
            aria-label="mobile-menu"
            aria-controls="mobile-menu"
            onClick={handleToggleMobileNavbar}
            color="inherit"
            className="xs:flex md:flex lg:hidden xl:hidden"
          >
            {toggleMobileNavbar ? <CloseRoundedIcon /> : <MenuOpenIcon />}
          </IconButton>

          <Logo />

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Navbar navbarFilterByUserType={navbarFilterByUserType} />
          </Box>
          <Box className="flex justify-end sm:w-40">
            <ProfileMenu />
          </Box>
        </Box>
        {/* Collapsed Navbar */}
        <Collapse in={toggleMobileNavbar} timeout="auto" unmountOnExit>
          <Box className="flex flex-col items-center w-full">
            <Navbar navbarFilterByUserType={navbarFilterByUserType} />
          </Box>
        </Collapse>
      </Toolbar>
    </AppBar>
  );
}

const Navbar = ({
  navbarFilterByUserType,
}: {
  navbarFilterByUserType: typeof NavbarMenu;
}) => {
  const location = useLocation();

  return (
    <NavigationMenu.Root className="relative z-[1] flex  justify-center">
      <NavigationMenu.List className="center shadow-blackA4 m-0 flex list-none rounded-[6px]  p-1 ">
        {navbarFilterByUserType.map((navItem) => (
          <React.Fragment key={navItem.title}>
            <NavigationMenu.Item>
              <Link to={navItem.href}>
                <NavigationMenu.Trigger
                  className={`${
                    location.pathname === navItem.href &&
                    "underline text-green-600"
                  } decoration-2 decoration-green-600 hover:underline hover:text-green-500 text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none hover:text-decoration-line`}
                >
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
                <ul className="sm:flex-col  one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[475px] sm:grid-cols-[0.75fr_1fr]">
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
