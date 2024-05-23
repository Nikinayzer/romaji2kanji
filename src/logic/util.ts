/**
 * Function to chunk array into smaller arrays
 * @param array array to chunk
 * @param size size of each chunk
 * @returns Array with parts of chunked array
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
}

const Util = {
  chunkArray,
};
export default Util;
