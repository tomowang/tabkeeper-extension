import { DuplicationInfo } from "@/types";
import { Badge, Card, CardBody, Text, Stack } from "@chakra-ui/react";

interface StatusBarProps {
  search: string;
  selectedTabs: (number | undefined)[];
  duplicationInfo: DuplicationInfo;
  tab: chrome.tabs.Tab | null;
}

export default function StatusBar({
  search,
  selectedTabs,
  duplicationInfo,
  tab,
}: StatusBarProps) {
  // https://developer.chrome.com/docs/extensions/reference/api/tabs#type-TabStatus
  let statusColor = "yellow";
  if (tab?.status === "complete") {
    statusColor = "green";
  } else if (tab?.status === "unloaded") {
    statusColor = "gray";
  }
  if (search === "" && duplicationInfo.count === 0 && tab === null) {
    return null;
  }
  return (
    <Card size="sm">
      <CardBody className="max-w-full w-full">
        <Stack direction="column" spacing="0.5">
          {search && (
            <Text className="truncate">
              <Badge variant="outline" colorScheme="yellow">
                {selectedTabs.length}
              </Badge>
              {" tabs matched search term"}
            </Text>
          )}
          {duplicationInfo.count > 0 && (
            <Text className="truncate">
              <Badge variant="outline" colorScheme="yellow">
                {duplicationInfo.totalCount}
              </Badge>
              {" tabs duplicate of "}
              <Badge variant="outline" colorScheme="yellow">
                {duplicationInfo.count}
              </Badge>
              {" groups"}
            </Text>
          )}
          {tab && (
            <>
              <Text as="span" className="truncate">
                {tab.title}
              </Text>
              <Text
                as="span"
                className="truncate"
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
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
