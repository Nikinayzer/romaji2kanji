function chunkArray(array, size) {
    const chunkedArray = [];
    
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    
    return chunkedArray;
}
export default { chunkArray };