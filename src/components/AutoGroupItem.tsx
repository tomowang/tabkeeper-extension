import { IAutoGroupRule } from "@/types";
import {
  Box,
  Card,
  CardBody,
  FormControl,
  HStack,
  IconButton,
  Input,
  Spacer,
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
          <HStack w="full">
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
            <Spacer />
            <Box>
              <IconButton
                size="sm"
                colorScheme="red"
                variant="ghost"
                aria-label={"Delete"}
                icon={<FaRegTrashCan />}
                onClick={handleDelete}
              ></IconButton>
            </Box>
          </HStack>
          <FormControl isRequired>
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
        </VStack>
      </CardBody>
    </Card>
  );
}
