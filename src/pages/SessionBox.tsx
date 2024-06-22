import SessionBoxItem from "@/components/SessionBoxItem";
import { ISessionBoxItem } from "@/types";
import { Button, Flex, Heading, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegPlusSquare, FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function SessionBox() {
  const toast = useToast();
  const [items, setItems] = useState<ISessionBoxItem[]>([]);
  const [newItem, setNewItem] = useState<ISessionBoxItem | null>(null);
  useEffect(() => {
    chrome.storage.local.get("sessionBox", ({ sessionBox }) => {
      if (sessionBox) {
        setItems(sessionBox as ISessionBoxItem[]);
      }
    });
  });

  function handleUpdate(index: number, item: ISessionBoxItem) {
    const newItems = [...items];
    newItems[index] = item;
    chrome.storage.local.set({ sessionBox: newItems }, () => {
      setItems(newItems);
    });
  }

  function handleDeleteItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    chrome.storage.local.set({ sessionBox: newItems }, () => {
      setItems(newItems);
      toast({
        title: "Session Box deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    });
  }

  function handleAdd() {
    setNewItem({
      title: "",
      urls: [],
    });
  }

  function handleUpdateNewItem(item: ISessionBoxItem) {
    setNewItem(item);
  }

  function handleSave() {
    if (!newItem) return;
    if (newItem.title === "" || newItem.urls.length === 0) {
      toast({
        title: "Error",
        description: "Title and URLs are required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    const newItems = [...items, newItem];
    chrome.storage.local.set({ sessionBox: newItems }, () => {
      setItems(newItems);
      setNewItem(null);
      toast({
        title: "Session Box added",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    });
  }

  return (
    <>
      <Heading as="h2" size="sm" mb={2}>
        Session Boxes
      </Heading>
      <VStack spacing={2}>
        {items.map((item, index) => {
          return (
            <SessionBoxItem
              key={index}
              item={item}
              handleUpdate={(item: ISessionBoxItem) => {
                handleUpdate(index, item);
              }}
              handleDelete={() => {
                handleDeleteItem(index);
              }}
            ></SessionBoxItem>
          );
        })}
        {newItem !== null && (
          <SessionBoxItem
            item={newItem}
            handleUpdate={(item: ISessionBoxItem) => {
              handleUpdateNewItem(item);
            }}
            handleDelete={() => {
              setNewItem(null);
            }}
          ></SessionBoxItem>
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
