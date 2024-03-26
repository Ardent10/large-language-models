import { NavbarMenu } from "@/utils/constants";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    console.log("click", event.currentTarget);
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleClose = () => {
    console.log("close");
    setAnchorEl(null);

    setOpenIndex(null);
  };

  return (
    <Box
      className="flex flex-row items-center justify-between"
      onMouseLeave={handleClose}
    >
      {NavbarMenu.map((navItem, index) => (
        <React.Fragment key={index}>
          <Button
            aria-owns={anchorEl ? `menu-${index}` : undefined}
            aria-haspopup="true"
            className="text-lg"
            onMouseEnter={(e) => handleClick(e, index)}
            onClick={() => navigate(navItem.href)}
          >
            <Typography
              variant="body1"
              aria-controls={`menu-${index}`}
              aria-haspopup="true"
              fontSize={14}
              fontWeight={500}
            >
              {navItem.title}
              {openIndex === index ? <ExpandLess /> : <ExpandMore />}
            </Typography>
          </Button>

          <Menu
            id={`menu-${index}`}
            anchorEl={anchorEl}
            open={openIndex === index}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{ onMouseLeave: handleClose, onMouseEnter: handleClose}}
          >
            {navItem.submenu.map((subItem, subIndex) => (
              <MenuItem key={subIndex} className="bg-black">
                <Typography variant="body2">{subItem.submenuLabel}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      ))}
    </Box>
  );
}

// import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
// import { useState } from "react";
// export function Navbar() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const handleClick = (index: any) => {
//     setOpenIndex(index === openIndex ? null : index);
//   };

//   return (
//     <div className="relative z-10 flex justify-center">
//       <ul className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0 2px 10px]">
//         {menuItems.map((menuItem, index) => (
//           <li key={index} className="relative">
//             <button
//               onClick={() => handleClick(index)}
//               className={
//                 "text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0 0 0 2px]"
//               }
//             >
//               {menuItem.title}
//               <KeyboardArrowDownRoundedIcon
//                 className={
//                   "text-violet10 relative top-[1px] transition-transform duration-250 ease-in group-data-[state=open]:-rotate-180"
//                 }
//                 aria-hidden="true"
//               />
//             </button>
//             {openIndex === index && (
//               <ul className="absolute top-full left-0 w-full bg-white p-4 rounded-[6px] shadow-[0 2px 10px]">
//                 {menuItem?.submenu?.map((subItem, subIndex) => (
//                   <li key={subIndex} className="text-violet11 hover:bg-violet3">
//                     <a
//                       href={subItem.href}
//                       className="block px-4 py-2 no-underline"
//                     >
//                       {subItem.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // Sample menu items
// const menuItems = [
//   {
//     title: "Learn",
//     submenu: [
//       { title: "Stitches", href: "https://stitches.dev/" },
//       { title: "Colors", href: "/colors" },
//       { title: "Icons", href: "https://icons.radix-ui.com/" },
//     ],
//   },
//   {
//     title: "Overview",
//     submenu: [
//       { title: "Introduction", href: "/primitives/docs/overview/introduction" },
//       {
//         title: "Getting started",
//         href: "/primitives/docs/overview/getting-started",
//       },
//       { title: "Styling", href: "/primitives/docs/guides/styling" },
//     ],
//   },
//   {
//     title: "Github",
//     href: "https://github.com/radix-ui",
//   },
// ];
