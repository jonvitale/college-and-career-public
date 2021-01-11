export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['SchoolYear'],
          qFieldLabels: ['SchoolYear'],
        },
        qNullSuppression: true,
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: 'Sum({<[FFM_Denom] = {1}>} 1)',
          qLabel: 'Flag_Year',
        },
      },
    ],
    qInitialDataFetch: [{ qWidth: 2, qHeight: 100 }],
  },
}
