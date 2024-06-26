import { DuplicationInfo, ToolbarAction } from "@/types";
import {
  Box,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { ElementType } from "react";
import { IoMdHelpBuoy, IoMdRefresh } from "react-icons/io";
import { LiaObjectGroup, LiaObjectUngroup } from "react-icons/lia";
import { PiMemory } from "react-icons/pi";
import { RiCloseLine, RiPushpinLine, RiUnpinLine } from "react-icons/ri";
import {
  TbTriangleSquareCircle,
  TbTriangleSquareCircleFilled,
} from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

interface ToolBarProps {
  search: string;
  handleSearch: (search: string) => void;
  selectedTabs: chrome.tabs.Tab[];
  showDuplications: boolean;
  duplicationInfo: DuplicationInfo;
  handleToolbarAction: (
    tabs: chrome.tabs.Tab[] | number[],
    action: ToolbarAction
  ) => void;
}

export default function ToolBar({
  search,
  handleSearch,
  selectedTabs,
  showDuplications,
  duplicationInfo,
  handleToolbarAction,
}: ToolBarProps) {
  const count = selectedTabs.length;

  let duplicatedIds: number[] = [];
  for (const url in duplicationInfo.tabUrlIDMapping) {
    const tabIds = duplicationInfo.tabUrlIDMapping[url];
    if (tabIds.length > 1) {
      duplicatedIds = duplicatedIds.concat(tabIds.slice(1));
    }
  }
  return (
    <Flex direction="row" alignItems="center" gap={2}>
      <Tooltip
        hasArrow
        placement="bottom-start"
        label="Click to show menus, mouse over to show tab information."
      >
        <Box>
          <Icon as={IoMdHelpBuoy} w={6} h={6}></Icon>
        </Box>
      </Tooltip>
      <Box>
        <InputGroup size="sm">
          <Input
            borderRadius="md"
            placeholder="Search title or URL"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          ></Input>
          <InputRightElement>
            {search && (
              <Icon
                as={RiCloseLine}
                w={6}
                h={6}
                cursor="pointer"
                onClick={() => handleSearch("")}
              ></Icon>
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Spacer />
      <ToolBarAction
        label="Taggle highlight duplicated tabs"
        icon={TbTriangleSquareCircleFilled}
        isDisabled={duplicationInfo.count === 0}
        isChecked={showDuplications}
        onClick={() => {
          handleToolbarAction([], ToolbarAction.HighlightDuplicates);
        }}
      ></ToolBarAction>
      <Divider orientation="vertical" />
      <ToolBarAction
        label={`Deduplicate ${
          duplicationInfo.totalCount - duplicationInfo.count
        } tabs`}
        labelForDisabled="Deduplicate"
        icon={TbTriangleSquareCircle}
        isDisabled={duplicationInfo.count === 0}
        onClick={() => {
          handleToolbarAction(duplicatedIds, ToolbarAction.Deduplicate);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Pin ${count} tabs`}
        labelForDisabled="Pin"
        icon={RiPushpinLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Pin);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Unpin ${count} tabs`}
        labelForDisabled="Unpin"
        icon={RiUnpinLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Unpin);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Group ${count} tabs`}
        labelForDisabled="Group"
        icon={LiaObjectGroup}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Group);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Ungroup ${count} tabs`}
        labelForDisabled="Ungroup"
        icon={LiaObjectUngroup}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Ungroup);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Unload ${count} tabs`}
        labelForDisabled="Unload"
        icon={PiMemory}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Unload);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Reload ${count} tabs`}
        labelForDisabled="Reload"
        icon={IoMdRefresh}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Reload);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Close ${count} tabs`}
        labelForDisabled="Close"
        icon={RiCloseLine}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.Close);
        }}
      ></ToolBarAction>
      <ToolBarAction
        label={`Save ${count} tabs to session box`}
        labelForDisabled="Save to session box"
        icon={FaRegSave}
        isDisabled={count === 0}
        onClick={() => {
          handleToolbarAction(selectedTabs, ToolbarAction.SaveSession);
        }}
      ></ToolBarAction>
    </Flex>
  );
}

interface ToolBarActionProps {
  label: string;
  labelForDisabled?: string;
  icon: ElementType;
  isDisabled: boolean;
  isChecked?: boolean;
  onClick: () => void;
}

function ToolBarAction({
  label,
  labelForDisabled,
  icon,
  isDisabled,
  isChecked,
  onClick,
}: ToolBarActionProps) {
  return (
    <Tooltip
      label={labelForDisabled && isDisabled ? labelForDisabled : label}
      hasArrow
    >
      <Box
        as="span"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        color={isDisabled ? "gray.500" : "gray.700"}
        onClick={() => {
          !isDisabled && onClick();
        }}
      >
        <Icon as={icon} w={6} h={6} color={isChecked ? "blue.500" : ""}></Icon>
      </Box>
    </Tooltip>
  );
}
