import { Box, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

interface ActionMenuItemProps {
  icon: ElementType;
  title: string;
  onClick: () => void;
}

export default function ActionMenuItem({
  icon,
  title,
  onClick,
}: ActionMenuItemProps) {
  return (
    <Flex
      as="li"
      cursor="pointer"
      gap={2}
      _hover={{ color: "blue.500" }}
      onClick={onClick}
    >
      <Icon as={icon} w={6} h={6} />
      <Box as="span" lineHeight={6}>
        {title}
      </Box>
    </Flex>
  );
}
