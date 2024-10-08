import React from "react";
import { Box, styled, Typography } from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LabelIcon from "@mui/icons-material/Label";

interface NavItemProps {
  active: boolean;
}

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})<NavItemProps>(({ theme, active }) => ({
  textDecoration: "none",
  padding: theme.spacing(0.9, 1, 0.9, 0.5),
  fontSize: "14px",
  color: active ? "#db4c3f" : "#202020",
  backgroundColor: active ? "#ffecea" : "transparent",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  borderRadius: "5px",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: active ? "#ffecea" : "#ebe8e89e",
  },
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));

interface NavItemsProps {
  pathname: string;
}

const NavItems: React.FC<NavItemsProps> = ({ pathname }) => (
  <Box>
    <NavItem href="/in-development" active={pathname === "/search"}>
      <SearchIcon fontSize="small" />
      <NavText>Search</NavText>
    </NavItem>
    <NavItem href="/inbox" active={pathname === "/inbox"}>
      <InboxIcon fontSize="small" />
      <NavText>Inbox</NavText>
    </NavItem>
    <NavItem href="/today" active={pathname === "/today"}>
      <CalendarTodayIcon fontSize="small" />
      <NavText>Today</NavText>
    </NavItem>
    <NavItem href="/in-development" active={pathname === "/upcoming"}>
      <DateRangeIcon fontSize="small" />
      <NavText>Upcoming</NavText>
    </NavItem>
    <NavItem href="/in-development" active={pathname === "/filters-labels"}>
      <LabelIcon fontSize="small" />
      <NavText>Filters & Labels</NavText>
    </NavItem>
  </Box>
);

export default NavItems;
