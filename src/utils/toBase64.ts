import { Buffer } from "buffer";

export const toBase64 = (uInt8Array: Uint8Array) => {
  return Buffer.from(uInt8Array).toString("base64");
};
