// adminPanelConfig.ts

import { Tab } from "../type_declarations/types";

interface SortingFunction {
  (a: any, b: any, direction: string): number;
}

export interface TabConfig {
  key: Tab;
  filter: (item: any, searchTerm: string) => boolean;
  sorting: {
    [key: string]: SortingFunction;
  };
}

const adminPanelConfig: TabConfig[] = [
  {
    key: Tab.USERS,
    filter: (item: any, searchTerm: string) => item.isAdmin === true,
    sorting: {
      id: (a: any, b: any, direction: string) => {
        return direction === "ascending" ? a.id - b.id : b.id - a.id;
      },
    },
  },
  {
    key: Tab.WORDS,
    filter: (item: any, searchTerm: string) => item.isKatakana === true,
    sorting: {
      id: (a: any, b: any, direction: string) => {
        return direction === "ascending" ? a.id - b.id : b.id - a.id;
      },
    },
  },
  // Add configurations for other tabs as needed
];

export default adminPanelConfig;
