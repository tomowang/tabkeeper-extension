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
  Tooltip,
} from "@chakra-ui/react";
import { IoMdHelpBuoy, IoMdRefresh } from "react-icons/io";
import { RiCloseLine, RiUnpinLine, RiPushpinLine } from "react-icons/ri";
import { PiMemory } from "react-icons/pi";
import { LiaObjectGroup, LiaObjectUngroup } from "react-icons/lia";
import { ElementType } from "react";
import { ToolbarAction } from "@/types";

interface ToolBarProps {
  search: string;
  setSearch: (search: string) => void;
  selectedTabs: (number | undefined)[];
  handleToolbarAction: (
    tabIds: (number | undefined)[],
    action: ToolbarAction
  ) => void;
}

export default function ToolBar({
  search,
  setSearch,
  selectedTabs,
  handleToolbarAction,
}: ToolBarProps) {
  const count = selectedTabs.length;
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
      <ToolBarAction
        label={`Group ${count} tabs`}
        icon={RiPushpinLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Pin);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Ungroup ${count} tabs`}
        icon={RiUnpinLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Unpin);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Group ${count} tabs`}
        icon={LiaObjectGroup}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Group);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Ungroup ${count} tabs`}
        icon={LiaObjectUngroup}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Ungroup);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Unload ${count} tabs`}
        icon={PiMemory}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Unload);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Reload ${count} tabs`}
        icon={IoMdRefresh}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Reload);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Close ${count} tabs`}
        icon={RiCloseLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Close);
        }}
      ></ToolBarAction>
    </Flex>
  );
}

interface ToolBarActionProps {
  label: string;
  icon: ElementType;
  isDisabled: boolean;
  onClick: () => void;
}

function ToolBarAction({
  label,
  icon,
  isDisabled,
  onClick,
}: ToolBarActionProps) {
  return (
    <Tooltip label={label} isDisabled={isDisabled}>
      <Box
        as="span"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        color={isDisabled ? "gray.500" : "gray.700"}
        onClick={onClick}
      >
        <Icon as={icon} w={6} h={6}></Icon>
      </Box>
    </Tooltip>
  );
}
