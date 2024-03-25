import { DarkMode } from "@common/theme";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavbarMenu } from "../../../utils/constants";
import { ProfileMenu } from "./profileMenu";
import { Sidebar } from "./sidebar";

export function Header() {
  const [openSidebar, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <AppBar position="absolute" className="px-2">
      <Toolbar className="flex justify-between">
        <Sidebar open={openSidebar} />
        <div id="logo">
          <Link to="/">
            <Typography variant="h6" component="div">
              Large Language Models (LLM)
            </Typography>
          </Link>
        </div>
        <div id="main-navigation" className="flex flex-row">
          {NavbarMenu.map((navItem) => (
            <div key={navItem.title}>
              <Link to={navItem.href} className="text-lg">
                <Typography variant="h6" component="div">
                  {navItem.title}
                </Typography>
              </Link>
              <div
                className="border-green-600 border dark:bg-black rounded-xl z-10"
                style={{
                  width: "400px",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  maxWidth: "600px",
                }}
              >
                <ul className="p-4">
                  <li>
                    <NavLink to="/models" className="Callout">
                      <svg
                        aria-hidden
                        width="38"
                        height="38"
                        viewBox="0 0 25 25"
                        fill="white"
                      >
                        <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                        <path d="M12 0H4V8H12V0Z"></path>
                        <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                      </svg>
                      <div className="CalloutHeading">Radix Primitives</div>
                      <p className="CalloutText">
                        Unstyled, accessible components for React.
                      </p>
                    </NavLink>
                  </li>
                  {navItem.submenu.map((submenuItem) => (
                    <ListItem
                      key={submenuItem.submenuLabel}
                      title={submenuItem.submenuLabel}
                      href={"/" + submenuItem.submenuLabel}
                    >
                      {navItem.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div id="header-buttons" className="flex gap-2">
          <ProfileMenu />
          <div>
            <Link to="/login" className="button-styles">
              Login
            </Link>
          </div>
          <DarkMode />
        </div>
      </Toolbar>
    </AppBar>
  );
}

const ListItem = ({
  title,
  children,
  href,
  ...props
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavLink
        {...props}
        to={href} // Change from href to to
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </NavLink>
    </li>
  );
};

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   buttonVariants,
// } from "@/shadcn/index";
// import { cn } from "@/shadcn/lib/utils";
// import { useAppState } from "@/store";
// import { ModeToggle } from "@common/theme";
// import { LogIn } from "lucide-react";
// import * as React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { NavbarMenu } from "../../../utils/constants";
// import { ProfileMenu } from "./profileMenu";
// import { Sidebar } from "./siderbar";

// export function Header() {
//   const [state] = useAppState();

//   return (
//     <header id="header" className="px-2 w-screen flex justify-center">
//       <div
//         id="header-container"
//         className="flex absolute top-4 left-8  w-[95%] bg-opacity-50 backdrop-blur-lg z-10 items-center px-2 border border-green-600 rounded-xl lg:px-7.5 xl:px-4 max-lg:py-4"
//       >
//         <Sidebar />
//         <div id="logo">
//           <Link to="/">
//             <h1 className="text-xl w-full font-semibold">
//               Large Language Models (LLM)
//             </h1>
//           </Link>
//         </div>

//         <nav
//           id="main-navigation"
//           className="flex flex-row fixed lg:static lg:flex lg:mx-auto lg:bg-transparent"
//         >
//           <NavigationMenu className="py-2">
//             <NavigationMenuList>
//               {NavbarMenu.map((navItem) => (
//                 <NavigationMenuItem key={navItem.title}>
//                   <Link to={navItem.href} className="text-lg">
//                     <NavigationMenuTrigger className="bg-transparent">
//                       {navItem.title}
//                     </NavigationMenuTrigger>
//                   </Link>
//                   <NavigationMenuContent className="border-green-600 border dark:bg-black rounded-xl z-10">
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//                       <li style={{ gridRow: "span 3" }}>
//                         <NavLink className="Callout" to="/models">
//                           <svg
//                             aria-hidden
//                             width="38"
//                             height="38"
//                             viewBox="0 0 25 25"
//                             fill="white"
//                           >
//                             <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
//                             <path d="M12 0H4V8H12V0Z"></path>
//                             <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
//                           </svg>
//                           <div className="CalloutHeading">Radix Primitives</div>
//                           <p className="CalloutText">
//                             Unstyled, accessible components for React.
//                           </p>
//                         </NavLink>
//                       </li>
//                       {navItem.submenu.map((submenuItem) => (
//                         <ListItem
//                           key={submenuItem.submenuLabel}
//                           title={submenuItem.submenuLabel}
//                           href={"/" + submenuItem.submenuLabel}
//                         >
//                           {navItem.description}
//                         </ListItem>
//                       ))}
//                     </ul>
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </nav>
//         <div id="header-buttons" className="flex gap-2">
//           {state?.userProfile?.id ? (
//             <ProfileMenu />
//           ) : (
//             <Link
//               to="/login"
//               className={cn(
//                 buttonVariants({ variant: "animatedGradientBorder" })
//               )}
//             >
//               Login
//               <LogIn className="ml-2" />
//             </Link>
//           )}
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
