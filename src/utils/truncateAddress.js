export function shortAddress(address, length) {
  return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
}
