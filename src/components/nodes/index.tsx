import { Audio, AudioData } from "./Audio";
import { Image, ImageData } from "./Image";
import { Message, MessageData } from "./Message";

export * from "./Audio";
export * from "./Image";
export * from "./Message";

export const nodeTypes = { Message, Image, Audio } as const;

export type CustomNodeType = keyof typeof nodeTypes;

export type CustomNodeData = MessageData | ImageData | AudioData;
