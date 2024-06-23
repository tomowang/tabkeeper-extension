import { S_KEY_AUTO_GROUP_RULES, S_KEY_SESSION_BOX } from "@/utils/const";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import {
  FaDownload,
  FaUpload,
  FaInfoCircle,
  FaGithub,
  FaBug,
} from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

export default function General() {
  const manifest = chrome.runtime.getManifest();
  const toast = useToast();
  function handleBackup() {
    chrome.storage.local.get(
      [S_KEY_AUTO_GROUP_RULES, S_KEY_SESSION_BOX],
      (result) => {
        const data = JSON.stringify(result, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tabkeeper-${new Date().toISOString()}.json`;
        a.click();
      }
    );
  }
  function handleRestore() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const data = await file.text();
      try {
        const settings = JSON.parse(data) as Record<string, unknown>;
        chrome.storage.local.set(settings, () => {
          toast({
            title: "Settings restored",
            description: "Settings have been restored from the file.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        });
      } catch (error) {
        toast({
          title: "Failed to restore settings",
          description: "Failed to restore settings from the file.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    };
    input.click();
  }
  return (
    <>
      <Heading as="h2" size="sm" mb={2}>
        General
      </Heading>
      <VStack spacing={2}>
        <Card size="sm" w="full">
          <CardHeader>
            <Heading as="h3" size="sm">
              Backup/Restore
            </Heading>
          </CardHeader>
          <CardBody>
            <List spacing={2}>
              <ListItem>
                <Button
                  leftIcon={<FaDownload />}
                  variant="outline"
                  size="sm"
                  onClick={handleBackup}
                >
                  Backup settings
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  leftIcon={<FaUpload />}
                  variant="outline"
                  size="sm"
                  onClick={handleRestore}
                >
                  Restore settings from file
                </Button>
              </ListItem>
            </List>
          </CardBody>
        </Card>
        <Card size="sm" w="full">
          <CardHeader>
            <Heading as="h3" size="sm">
              Info
            </Heading>
          </CardHeader>
          <CardBody>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={FaInfoCircle}></ListIcon>
                <Link href="https://github.com/tomowang/tabkeeper-extension/releases/latest">
                  Version {manifest.version}
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaGithub}></ListIcon>
                <Link href="https://github.com/tomowang/tabkeeper-extension">
                  Open Source with MIT license (give a star if you like)
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaBug}></ListIcon>
                <Link href="https://github.com/tomowang/tabkeeper-extension/issues">
                  Fire an Issue
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={GoCommentDiscussion}></ListIcon>
                <Link href="https://github.com/tomowang/tabkeeper-extension/discussions">
                  Feature request and general discussions
                </Link>
              </ListItem>
            </List>
          </CardBody>
        </Card>
      </VStack>
    </>
  );
}
