import mut from "./module.js";

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing div", () => {
  const expected = 8;
  const got = mut.div(72, 9);
  expect(got).toBe(expected);
});

test("Testing div by zero", () => {
  const got = mut.div(72, 0);
  expect(got).toBe(Infinity);
});

test("Testing div by zero -- negative", () => {
  const got = mut.div(-72, 0);
  expect(got).toBe(-Infinity);
});

test("Testing div by zero by zero", () => {
  const got = mut.div(0, 0);
  expect(got).toBeNaN();
});

test("Testing contain numbers empty", () => {
  const got = mut.containsNumbers("");
  expect(got).toBe(false);
});

test("Testing contain numbers. 1 num", () => {
  const got = mut.containsNumbers("1");
  expect(got).toBe(true);
});

test("Testing contain numbers. 1 char", () => {
  const got = mut.containsNumbers("z");
  expect(got).toBe(false);
});

test("Testing contain numbers. 1 space", () => {
  const got = mut.containsNumbers(" ");
  expect(got).toBe(false);
});

test("Testing contain numbers and letter. ", () => {
  const got = mut.containsNumbers("123ABC");
  expect(got).toBe(true);
});

test("Testing contain numbers and letter. ", () => {
  const got = mut.containsNumbers("AB3C");
  expect(got).toBe(true);
});
