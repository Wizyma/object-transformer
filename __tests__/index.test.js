const getModels = require('../index');

const simpleMock = {
  property: 'jest Test',
  variant: ["A", "B"]
}

const complexMock = {
  property: 'jest Test',
  variantA: ["A", "B"],
  variantB: ["jest", "fb"],
  variantE: ["BA"],
  variantR: [1]
}

const expectedMock = [{
    variantA: 'A',
    variantB: 'jest',
    variantE: 'BA',
    variantR: 1,
    property: 'jest Test'
  },
  {
    variantA: 'A',
    variantB: 'fb',
    variantE: 'BA',
    variantR: 1,
    property: 'jest Test'
  },
  {
    variantA: 'B',
    variantB: 'jest',
    variantE: 'BA',
    variantR: 1,
    property: 'jest Test'
  },
  {
    variantA: 'B',
    variantB: 'fb',
    variantE: 'BA',
    variantR: 1,
    property: 'jest Test'
  }
]

describe('test complex getModels', () => {
  const models = getModels(complexMock);

  it('should match snapshot', () => {
    expect(models).toMatchSnapshot();
  })

  it('length should be equal 4', () => {
    expect(models.length).toBe(4);
  })

  it('should match expected value', () => {
    expect(models).toEqual(expect.arrayContaining(expectedMock))
  })
})

describe('test simple mock getModels', () => {
  const models = getModels(simpleMock);

  it('should match snapshot', () => {
    expect(models).toMatchSnapshot();
  })

  it('length should be equal 2', () => {
    expect(models.length).toBe(2);
  })

  it('should match expected value', () => {
    expect(models).toEqual(expect.arrayContaining([ 
      { variant: 'A', property: 'jest Test' },
      { variant: 'B', property: 'jest Test' } ]
    ))
  })
})
