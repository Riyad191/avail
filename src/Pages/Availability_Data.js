import * as _ from "lodash";

const MAIN_SUCCESS = "#1C9536";

const MAIN_FAILURE = "#DB2828";

const seriesIndexMapper = {
  0: "green",
  1: "amber",
  2: "red",
};

const colorLimits = {
  availability: {
    green: {
      codes: [99.95, 100.1],
      name: "100",
      label: "Greater than 99.95",
    },
    amber: {
      codes: [99, 99.95],
      name: "< 99.95%",
      label: "Between 99 & 99.95",
    },
    red: {
      codes: [0, 99],
      name: "< 99%",
      label: "Less than 99",
    },
  },
  error: {
    green: {
      codes: [0, 0.5],
      name: "< .5%",
      label: "Less than 0.5%",
    },
    amber: {
      codes: [0.5, 1],
      name: "< 1%",
      label: "Less than 1%",
    },
    red: {
      codes: [1, 100.1],
      name: "> 1%",
      label: "Greater than 1%",
    },
  },
};

export const getActiveFilterLabel = (filterParams) => {
  return colorLimits[filterParams.reportName][
    seriesIndexMapper[filterParams.seriesIndex]
  ].label;
};

export const filterDataByParams = (processedData, filterParams) => {
  const limit1 =
    colorLimits[filterParams.reportName][
      seriesIndexMapper[filterParams.seriesIndex]
    ].codes[0];
  const limit2 =
    colorLimits[filterParams.reportName][
      seriesIndexMapper[filterParams.seriesIndex]
    ].codes[1];
  return _.filter(processedData, (p) => {
    const metric = parseFloat(p[filterParams.dataKey]);
    return metric >= limit1 && metric < limit2;
  });
};

export const processAvailabilityData = (rawMetrics) => {
  const pattern = /[0-9]/g;
  const firstStepData = _.flatMap(_.map(rawMetrics, (raw) => _.values(raw)));
  return _.map(firstStepData, (f) => {
    const keys = _.keys(f);
    const data = [];
    _.forEach(keys, (k) => {
      try {
        if (k.match(pattern)) {
          const year = k.substring(0, 4);
          const month = k.substring(4, 6);
          const day = k.substring(6, 8);
          const updatedKey = month + "/" + day + "/" + year;
          f[updatedKey] = f[k];
          data.push({
            key: updatedKey,
            value: f[k],
          });
        }
      } catch (e) {
        //
      }
    });
    f["data"] = data;
    return f;
  });
};

export const formChartData = (availabilityMetrics, reportName) => {
  const colorCodes = colorLimits[reportName];
  const keyHolders = _.flatMap(availabilityMetrics, (a) => a.data);
  const keys = _.uniq(_.map(keyHolders, (k) => k.key));
  const greenArray = formReqArray(
    availabilityMetrics,
    keys,
    colorCodes.green.codes[0],
    colorCodes.green.codes[1]
  );
  const amberArray = formReqArray(
    availabilityMetrics,
    keys,
    colorCodes.amber.codes[0],
    colorCodes.amber.codes[1]
  );
  const redArray = formReqArray(
    availabilityMetrics,
    keys,
    colorCodes.red.codes[0],
    colorCodes.red.codes[1]
  );
  return [
    {
      name: colorCodes.green.name,
      data: greenArray,
    },
    {
      name: colorCodes.amber.name,
      data: amberArray,
    },
    {
      name: colorCodes.red.name,
      data: redArray,
    },
  ];
};

const formReqArray = (availabilityMetrics, keys, limit1, limit2) => {
  const reqArray = {};
  for (let i = 0; i < keys.length; i++) {
    reqArray[keys[i]] = 0;
  }

  for (let i = 0; i < availabilityMetrics.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (
        availabilityMetrics[i][keys[j]] >= limit1 &&
        availabilityMetrics[i][keys[j]] < limit2
      ) {
        reqArray[keys[j]] = reqArray[keys[j]] ? reqArray[keys[j]] + 1 : 1;
      }
    }
  }
  return _.values(reqArray);
};

export const getxAxisKeys = (availabilityMetrics) => {
  const keyHolders = _.flatMap(availabilityMetrics, (a) => a.data);
  return _.uniq(_.map(keyHolders, (k) => k.key));
};

export const getColorMapping = (reportName, data) => {
  if (reportName === "availability") {
    return data > 99.95 ? MAIN_SUCCESS : data > 99 ? "#d3a51d" : MAIN_FAILURE;
  }
  return data < 0.5 ? MAIN_SUCCESS : data < 1 ? "#d3a51d" : MAIN_FAILURE;
};
