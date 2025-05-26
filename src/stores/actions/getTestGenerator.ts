// @/src/stores/actions/getTestGenerator.ts
export const getTestGenerator = async () => {
  const base = "http://localhost:3000";
  const res = await fetch(`${base}/api/orders`);
  const data = await res.json();
  return data;
};