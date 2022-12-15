const a = {
  20221011: "100.00",
  20221012: "100.00",
  20221013: "100.00",
  20221014: "100.00",
  20221015: "100.00",
  appName: "hello",
  Flow: "hii",
};

const result = Object.keys(f)
  .map((m) => {
    if (
      m !== "appName" &&
      m !== "Flow" &&
      m !== "Tier" &&
      m !== "serviceName"
    ) {
      return {
        key: m,
        value: f[m],
      };
    }
  })
  .filter((element) => {
    return element !== undefined;
  });

// console.log(result);
