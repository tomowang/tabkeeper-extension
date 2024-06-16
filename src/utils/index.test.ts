import { expect, test } from "vitest";

import { defaultdict } from "./index";

test("defaultdict number value", () => {
  const t1 = defaultdict(Number);
  t1.a += 1;
  expect(t1.a).toBe(1);
  t1.a += 1;
  expect(t1.a).toBe(2);
  t1.b += 1;
  expect(t1.b).toBe(1);
});

test("defaultdict string value", () => {
  const t1 = defaultdict(String);
  t1.a += "a";
  expect(t1.a).toBe("a");
  t1.a += "a";
  expect(t1.a).toBe("aa");
  t1.b += "b";
  expect(t1.b).toBe("b");
});

test("defaultdict list value", () => {
  const t1 = defaultdict(Array<number>);
  t1.a.push(1);
  expect(t1.a).toStrictEqual([1]);
  t1.a.push(1);
  expect(t1.a).toStrictEqual([1, 1]);
  t1.b.push(1);
  expect(t1.b).toStrictEqual([1]);
});
