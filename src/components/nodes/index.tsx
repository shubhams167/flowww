import { Message, MessageData } from "./Message";
import { Image, ImageData } from "./Image";
import { Audio, AudioData } from "./Audio";

export * from "./Message";
export * from "./Image";
export * from "./Audio";

export const nodeTypes = { Message, Image, Audio } as const;

export type CustomNodeType = keyof typeof nodeTypes;

export type CustomNodeData = MessageData | ImageData | AudioData;
