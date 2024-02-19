import { Audio, AudioData } from "./Audio";
import { Image, ImageData } from "./Image";
import { Text, TextData } from "./Text";

export * from "./Audio";
export * from "./Image";
export * from "./Text";

export const nodeTypes = { Text, Image, Audio } as const;

export type CustomNodeType = keyof typeof nodeTypes;

export type CustomNodeData = TextData | ImageData | AudioData;
