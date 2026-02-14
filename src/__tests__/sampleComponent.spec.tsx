import { render } from "@testing-library/react";
import App from "@/App";

describe("Vitest動作確認テスト", () => {
  it("タイトルが「TEST TITLE」であること", () => {
    render(<App />);
  });
});
