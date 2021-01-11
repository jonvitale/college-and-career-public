export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['Current School Name'],
          qFieldLabels: ['school'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['School URL Slug'],
          qFieldLabels: ['slug'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['Current ULCS Code'],
          qFieldLabels: ['ulcs'],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['Sector'],
          qFieldLabels: ['sector'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['Current ZipCode'],
          qFieldLabels: ['zipCode'],
        },
        qNullSuppression: false,
      },
      {
        qDef: {
          qFieldDefs: ['Current AdmissionType'],
          qFieldLabels: ['admissionType'],
        },
        qNullSuppression: true,
      },
      {
        qDef: {
          qFieldDefs: ['Current Network'],
          qFieldLabels: ['network'],
        },
        qNullSuppression: true,
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: 'Sum({<[Flag_USL_CY] = {1}>} 1)',
          qLabel: 'Flag_CY',
        },
      },
    ],
    qInitialDataFetch: [{ qWidth: 20, qHeight: 500 }],
  },
}
