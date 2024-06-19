import { tabGroupColors } from "@/utils/const";
import { Box } from "@chakra-ui/react";

interface ColorChoiceItemProps {
  color: chrome.tabGroups.ColorEnum;
  selected: boolean;
  onClick: () => void;
}

function ColorChoiceItem({ color, selected, onClick }: ColorChoiceItemProps) {
  const c = color.startsWith("g_") ? color : `g_${color}`;
  return (
    <Box
      w={4}
      h={4}
      backgroundColor={c}
      borderRadius="full"
      borderWidth={2}
      borderColor={c}
      boxShadow={selected ? "inset 0 0 0 2px #fff" : ""}
      cursor="pointer"
      onClick={onClick}
    ></Box>
  );
}

interface ColorChoiceProps {
  colors?: chrome.tabGroups.ColorEnum[];
  selectedColor: chrome.tabGroups.ColorEnum;
  onColorChange: (color: chrome.tabGroups.ColorEnum) => void;
}

export default function ColorChoice({
  colors,
  selectedColor,
  onColorChange,
}: ColorChoiceProps) {
  if (!colors) colors = tabGroupColors;
  return (
    <Box display="flex" gap={1}>
      {colors.map((color) => (
        <ColorChoiceItem
          key={color}
          color={color}
          selected={color === selectedColor}
          onClick={() => onColorChange(color)}
        />
      ))}
    </Box>
  );
}
