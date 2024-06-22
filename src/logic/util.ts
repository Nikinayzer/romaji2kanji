/**
 * Function to chunk array into smaller arrays
 * @param array array to chunk
 * @param size size of each chunk
 * @returns Array with parts of chunked array
 */

import { Role } from "../type_declarations/types"; // Adjust the import path as necessary

export const getEnumString = (enumType: any, value: any): string => {
  return enumType[value] || value;
};
export const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
};

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
}

const Util = {
  chunkArray, getEnumString, formatDateTime
};
export default Util;
