// adminPanelConfig.ts

import { TAB } from "../type_declarations/types";

interface SortingFunction {
  (a: any, b: any, direction: string): number;
}

export interface TabConfig {
  key: TAB;
  filter: (item: any, searchTerm: string) => boolean;
  sorting: {
    [key: string]: SortingFunction;
  };
}

const adminPanelConfig: TabConfig[] = [
  {
    key: TAB.USERS,
    filter: (item: any, searchTerm: string) => item.isAdmin === true,
    sorting: {
      id: (a: any, b: any, direction: string) => {
        return direction === "ascending" ? a.id - b.id : b.id - a.id;
      },
    },
  },
  {
    key: TAB.WORDS,
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
