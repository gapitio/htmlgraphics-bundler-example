import codeDataJSON from "../../src/code-data.json";

declare global {
  const codeData: typeof codeDataJSON;
}
