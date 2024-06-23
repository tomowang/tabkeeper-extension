import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { FaInfoCircle, FaGithub, FaBug } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";

export default function General() {
  const manifest = chrome.runtime.getManifest();
  return (
    <>
      <Heading as="h2" size="sm" mb={2}>
        General
      </Heading>
      <HStack spacing={2}>
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
      </HStack>
    </>
  );
}
