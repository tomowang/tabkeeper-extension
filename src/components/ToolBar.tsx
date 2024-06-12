import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from "@chakra-ui/react";
import { IoMdHelpBuoy } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";

interface ToolBarProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function ToolBar({ search, setSearch }: ToolBarProps) {
  return (
    <Flex direction="row" alignItems="center" gap={2}>
      <Popover trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Box>
            <Icon as={IoMdHelpBuoy} w={6} h={6}></Icon>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            Click to show menus, mouse over to show tab information.
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Box>
        <InputGroup size="sm">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <InputRightElement>
            {search && (
              <Icon
                as={RiCloseLine}
                w={6}
                h={6}
                cursor="pointer"
                onClick={() => setSearch("")}
              ></Icon>
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Spacer />
    </Flex>
  );
}
