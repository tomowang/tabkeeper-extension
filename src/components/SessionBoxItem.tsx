import { ISessionBoxItem } from "@/types";
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
  useDisclosure,
} from "@chakra-ui/react";

import { FaCaretDown, FaCaretRight, FaRegTrashCan } from "react-icons/fa6";
import {
  MdOutlineAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

interface SessionBoxItemProps {
  item: ISessionBoxItem;
  handleUpdate: (item: ISessionBoxItem) => void;
  handleDelete: () => void;
}

export default function SessionBoxItem({
  item,
  handleUpdate,
  handleDelete,
}: SessionBoxItemProps) {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  return (
    <Card w="full" size="sm" variant="outline">
      <CardBody>
        <HStack>
          <IconButton
            size="sm"
            aria-label={"toggle"}
            variant="ghost"
            onClick={onToggle}
            icon={isOpen ? <FaCaretDown /> : <FaCaretRight />}
          ></IconButton>
          <FormControl isRequired w={48}>
            <Input
              type="text"
              placeholder="Session Box Title"
              size="sm"
              borderRadius="md"
              value={item.title}
              onChange={(e) => {
                handleUpdate({ ...item, title: e.target.value });
              }}
            />
          </FormControl>
          <Spacer />
          <IconButton
            size="sm"
            colorScheme="green"
            variant="ghost"
            aria-label={"Add"}
            icon={<MdOutlineAddCircleOutline />}
            tabIndex={-1}
            onClick={() => {
              handleUpdate({
                ...item,
                urls: [...item.urls, "https://example.com"],
              });
              onOpen();
            }}
          ></IconButton>
          <IconButton
            size="sm"
            colorScheme="red"
            variant="ghost"
            aria-label={"Delete"}
            icon={<FaRegTrashCan />}
            tabIndex={-1}
            onClick={handleDelete}
          ></IconButton>
        </HStack>
        <Box display={isOpen ? "block" : "none"}>
          <VStack spacing={2} mt={item.urls.length > 0 ? 2 : 0}>
            {item.urls.map((url, index) => (
              <HStack key={index} spacing={2} w="full">
                <FormControl isRequired>
                  <Input
                    type="text"
                    size="sm"
                    borderRadius="md"
                    value={url}
                    onChange={(e) => {
                      handleUpdate({
                        ...item,
                        urls: item.urls.map((u, i) =>
                          i === index ? e.target.value : u
                        ),
                      });
                    }}
                  />
                </FormControl>
                <IconButton
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  aria-label={"Remove"}
                  icon={<MdRemoveCircleOutline />}
                  tabIndex={-1}
                  onClick={() => {
                    handleUpdate({
                      ...item,
                      urls: item.urls.filter((_, i) => i !== index),
                    });
                  }}
                ></IconButton>
              </HStack>
            ))}
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
}
