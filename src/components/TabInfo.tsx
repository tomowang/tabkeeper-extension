import { Badge, Card, CardBody, Text, Stack } from "@chakra-ui/react";

interface TabInfoProps {
  tab: chrome.tabs.Tab;
}

export default function TabInfo({ tab }: TabInfoProps) {
  // https://developer.chrome.com/docs/extensions/reference/api/tabs#type-TabStatus
  let statusColor = "yellow";
  if (tab.status === "complete") {
    statusColor = "green";
  } else if (tab.status === "unloaded") {
    statusColor = "gray";
  }
  return (
    <Card size="sm">
      <CardBody maxW="full" w="full">
        <Stack direction="column" spacing="0.5">
          <Text
            as="span"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {tab.title}
          </Text>
          <Text
            as="span"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            fontSize="sm"
            color="gray.500"
          >
            {tab.url}
          </Text>
          <Stack direction="row">
            <Badge colorScheme={statusColor}>{tab.status}</Badge>
            {tab.pinned && <Badge colorScheme="green">Pinned</Badge>}
            {tab.active && <Badge colorScheme="blue">Active</Badge>}
            {tab.audible &&
              (tab.mutedInfo?.muted ? (
                <Badge colorScheme="red">Muted</Badge>
              ) : (
                <Badge colorScheme="purple">Audible</Badge>
              ))}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
