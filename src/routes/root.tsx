import { Outlet } from "react-router-dom";
import { NavItem } from "@/components/nav";

import { menus } from "./menus";
import { Box, Flex } from "@chakra-ui/react";

export default function Root() {
  return (
    <Flex w={"800px"} h={"600px"}>
      <Box
        as="nav"
        w="20%"
        minW="20%"
        minH="full"
        p={2}
        borderRightWidth={2}
        borderColor="gray.300"
      >
        <ul>
          {menus.map((menu, i) => {
            return <NavItem menu={menu} key={i}></NavItem>;
          })}
        </ul>
      </Box>
      <Box as="main" w="80%" p={2} overflowY="auto" overflowX="hidden">
        <Outlet />
      </Box>
    </Flex>
  );
}
