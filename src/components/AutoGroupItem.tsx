import { IAutoGroupRule } from "@/types";
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import ColorChoice from "./ColorChoice";

interface AutoGroupItemProps {
  item: IAutoGroupRule;
  handleUpdate: (item: IAutoGroupRule) => void;
  handleDelete: () => void;
}

export default function AutoGroupItem({
  item,
  handleUpdate,
  handleDelete,
}: AutoGroupItemProps) {
  return (
    <Card w="full" size="sm" variant="outline">
      <CardBody>
        <VStack spacing={2} align="start">
          <HStack w="full" alignItems="center">
            <FormControl isRequired w={48}>
              <Input
                isRequired={true}
                placeholder="Tab group title"
                size="sm"
                borderRadius="md"
                value={item.title}
                onChange={(e) =>
                  handleUpdate({ ...item, title: e.target.value })
                }
              />
            </FormControl>
            <ColorChoice
              selectedColor={item.color}
              onColorChange={(color: chrome.tabGroups.ColorEnum) =>
                handleUpdate({ ...item, color })
              }
            ></ColorChoice>
            <FormControl w="auto" display="flex" alignItems="center">
              <FormLabel mb="0">Enable?</FormLabel>
              <Switch
                size="sm"
                isChecked={item.enabled}
                onChange={(e) =>
                  handleUpdate({ ...item, enabled: e.target.checked })
                }
              />
            </FormControl>
            <Spacer />
            <Box>
              <IconButton
                size="sm"
                colorScheme="red"
                variant="ghost"
                aria-label={"Delete"}
                icon={<FaRegTrashCan />}
                onClick={handleDelete}
                tabIndex={-1}
              ></IconButton>
            </Box>
          </HStack>
          <HStack>
            <FormControl isRequired w={60}>
              <Input
                isRequired={true}
                placeholder="Tab group pattern"
                size="sm"
                borderRadius="md"
                value={item.pattern}
                onChange={(e) =>
                  handleUpdate({ ...item, pattern: e.target.value })
                }
              ></Input>
            </FormControl>
            <RadioGroup
              onChange={(e) => {
                handleUpdate({ ...item, mode: e as "wildcard" | "regex" });
              }}
              value={item.mode}
            >
              <HStack>
                <Radio value="wildcard">Wildcard</Radio>
                <Radio value="regex">RegEx</Radio>
              </HStack>
            </RadioGroup>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
