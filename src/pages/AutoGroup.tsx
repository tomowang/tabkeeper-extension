import { useEffect, useState } from "react";
import AutoGroupItem from "@/components/AutoGroupItem";
import { IAutoGroupRule } from "@/types";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { tabGroupColors } from "@/utils/const";
import { FaSave, FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function AutoGroup() {
  const toast = useToast();
  const [items, setItems] = useState<IAutoGroupRule[]>([]);
  const [newItem, setNewItem] = useState<IAutoGroupRule | null>(null);
  useEffect(() => {
    chrome.storage.local.get("autoGroupRules", ({ autoGroupRules }) => {
      if (autoGroupRules) {
        setItems(autoGroupRules as IAutoGroupRule[]);
      }
    });
  }, []);
  function handleUpdate(index: number, item: IAutoGroupRule) {
    const newItems = [...items];
    newItems[index] = item;
    chrome.storage.local.set({ autoGroupRules: newItems }, () => {
      setItems(newItems);
    });
  }
  function handleDeleteItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    chrome.storage.local.set({ autoGroupRules: newItems }, () => {
      setItems(newItems);
      toast({
        title: "Auto Group rule deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    });
  }
  function handleAdd() {
    const item: IAutoGroupRule = {
      title: "",
      color: tabGroupColors[items.length % tabGroupColors.length],
      mode: "wildcard",
      pattern: "",
    };
    setNewItem(item);
  }
  function handleSave() {
    if (!newItem) return;
    if (!newItem.title || !newItem.pattern) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (items.find((item) => item.title === newItem.title)) {
      toast({
        title: "Auto Group rule name already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    const newItems = [...items, newItem];
    chrome.storage.local.set({ autoGroupRules: newItems }, () => {
      setItems(newItems);
      setNewItem(null);
      toast({
        title: "Auto Group rule added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    });
  }
  function handelUpdateNewItem(item: IAutoGroupRule) {
    setNewItem(item);
  }
  return (
    <>
      <Heading as="h2" size="sm">
        Auto Group Rules
      </Heading>
      <Flex direction="column">
        {items.map((item, index) => {
          return (
            <Box mt={2} key={index}>
              <AutoGroupItem
                item={item}
                handleUpdate={(item: IAutoGroupRule) => {
                  handleUpdate(index, item);
                }}
                handleDelete={() => {
                  handleDeleteItem(index);
                }}
              ></AutoGroupItem>
            </Box>
          );
        })}
      </Flex>
      {newItem && (
        <Box mt={2}>
          <AutoGroupItem
            item={newItem}
            handleUpdate={(item: IAutoGroupRule) => {
              handelUpdateNewItem(item);
            }}
            handleDelete={() => {
              setNewItem(null);
            }}
          ></AutoGroupItem>
        </Box>
      )}
      <Flex direction="row" justifyContent="flex-end" gap={2} mt={2}>
        {newItem === null && (
          <Button
            size="sm"
            colorScheme="blue"
            isDisabled={newItem !== null}
            leftIcon={<FaRegPlusSquare />}
            onClick={handleAdd}
          >
            Add
          </Button>
        )}
        {newItem !== null && (
          <Button
            size="sm"
            colorScheme="blue"
            isDisabled={newItem === null}
            leftIcon={<FaSave />}
            onClick={handleSave}
          >
            Save
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          isDisabled={newItem === null}
          leftIcon={<MdOutlineCancel />}
          onClick={() => {
            setNewItem(null);
          }}
        >
          Cancel
        </Button>
      </Flex>
    </>
  );
}
