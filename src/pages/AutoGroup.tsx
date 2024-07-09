import { useEffect, useState } from "react";
import AutoGroupItem, {
  SortableAutoGroupItem,
} from "@/components/AutoGroupItem";
import { IAutoGroupRule } from "@/types";
import {
  Badge,
  Button,
  Flex,
  HStack,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { S_KEY_AUTO_GROUP_RULES, tabGroupColors } from "@/utils/const";
import { FaSave, FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

export default function AutoGroup() {
  const toast = useToast();
  const [items, setItems] = useState<IAutoGroupRule[]>([]);
  const [newItem, setNewItem] = useState<IAutoGroupRule | null>(null);
  useEffect(() => {
    chrome.storage.local.get(S_KEY_AUTO_GROUP_RULES, ({ autoGroupRules }) => {
      if (autoGroupRules) {
        const rules = autoGroupRules as IAutoGroupRule[];
        const now = Date.now();
        // compatible with previous settings
        for (let i = 0; i < rules.length; i++) {
          // Date.now() may be the same in for loop
          if (rules[i].id === undefined) rules[i].id = i + now;
        }
        setItems(rules);
      }
    });
  }, []);
  function handleUpdate(index: number, item: IAutoGroupRule) {
    const newItems = [...items];
    newItems[index] = item;
    chrome.storage.local.set({ [S_KEY_AUTO_GROUP_RULES]: newItems }, () => {
      setItems(newItems);
    });
  }
  function handleDeleteItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    chrome.storage.local.set({ [S_KEY_AUTO_GROUP_RULES]: newItems }, () => {
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
      id: Date.now(),
      title: "",
      color: tabGroupColors[items.length % tabGroupColors.length],
      mode: "wildcard",
      enabled: true,
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
    if (newItem.mode === "regex") {
      try {
        new RegExp(newItem.pattern);
      } catch (error) {
        toast({
          title: "Invalid regex pattern",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
    }
    const newItems = [...items, newItem];
    chrome.storage.local.set({ [S_KEY_AUTO_GROUP_RULES]: newItems }, () => {
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldId = active.id as number;
        const newId = over.id as number;
        let oldIndex = -1;
        let newIndex = -1;
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === newId) {
            newIndex = i;
          } else if (items[i].id === oldId) {
            oldIndex = i;
          }
        }
        const newItems = arrayMove(items, oldIndex, newIndex);
        void chrome.storage.local.set({ [S_KEY_AUTO_GROUP_RULES]: newItems });
        return newItems;
      });
    }
  }

  return (
    <>
      <HStack mb={2}>
        <Heading as="h2" size="sm">
          Auto Group Rules
        </Heading>
        <Badge variant="solid" colorScheme="blue">
          {items.length}
        </Badge>
      </HStack>
      <VStack spacing={2}>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items}>
            {items.map((item, index) => {
              return (
                <SortableAutoGroupItem
                  key={item.id}
                  item={item}
                  handleUpdate={(item: IAutoGroupRule) => {
                    handleUpdate(index, item);
                  }}
                  handleDelete={() => {
                    handleDeleteItem(index);
                  }}
                ></SortableAutoGroupItem>
              );
            })}
          </SortableContext>
        </DndContext>
        {newItem && (
          <AutoGroupItem
            item={newItem}
            handleUpdate={(item: IAutoGroupRule) => {
              handelUpdateNewItem(item);
            }}
            handleDelete={() => {
              setNewItem(null);
            }}
          ></AutoGroupItem>
        )}
      </VStack>
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
