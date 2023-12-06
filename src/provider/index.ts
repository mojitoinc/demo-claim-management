import { createContext } from "react";
import { ContentObject } from "@/interface";

export interface ContextType {
  content: ContentObject;
  setContent(f: ContentObject | ((prev: ContentObject) => ContentObject)): void;
}
const Context = createContext<ContextType>({} as ContextType);

export default Context;
