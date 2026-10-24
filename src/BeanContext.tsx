import { createContext } from "react";
import BeanShape from "types/BeanShape";

const BeanContext = createContext<{
  beanData: Record<string, BeanShape>;
  beanNames: string[];
  setBeanNames: (names: string[]) => void;
  toggleBean: (name: string) => void;
}>({
  beanData: {},
  beanNames: [],
  setBeanNames: () => {},
  toggleBean: () => {},
});

export default BeanContext;
