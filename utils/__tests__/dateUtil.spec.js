import {getFirstOfMonth} from "../dateUtil";

describe("getFirstOfMonth", () => {
  test("正常系のチェック", () => {
    expect(getFirstOfMonth("20221115")).toEqual("20221101");
    expect(getFirstOfMonth("20221231")).toEqual("20221201");
    expect(getFirstOfMonth("20221201")).toEqual("20221201");
  });
  test("異常系のチェック", () => {
    expect(getFirstOfMonth(null)).toEqual(null);
    expect(getFirstOfMonth(undefined)).toEqual(null);
    expect(getFirstOfMonth("")).toEqual(null);
    expect(getFirstOfMonth("1234")).toEqual(null);
  });
});
