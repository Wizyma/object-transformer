const { mergeAll } = require('ramda'); 

/**
 * 
 * ! WIP ------------------------------------------------------------------------
 * Basicly my need where => I have x field with some of them wich are multi select,
 * once every field is filled i need to create dynamicly an array of models for the server to 
 * match the api schema. 
 * I built this in mind of not taking in account the keys of my specific need so it can be used 
 * with anything.
 * 
 * Not the best or more optimised code, need to be reworked.
 * 
 */

/**
 * @function getOnyArrays
 *
 * @param {Object} input
 * @returns {Array}
 */
function getOnlyArrays(input) {
  return Object.entries(input)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(v => ({
          [key]: v
        }));
      }
      return null;
    })
    .filter(val => val !== null);
}

/**
 * @function getOnlyValues
 *
 * @param {Object} input
 * @returns {Array}
 */
function getOnlyValues(input) {
  return Object.entries(input)
    .map(([key, value]) => {
      if (!Array.isArray(value)) {
        return {
          [key]: value
        };
      }
      return null;
    })
    .filter(val => val !== null);
}

/**
 * @function buildModel
 *
 * @param {Array} input
 * @param {Array} [output=[]]
 * @returns
 */
function buildModels(input, output = []) {
  const firstItem = input.shift();
  if (input[0]) {
    if (output.length === 0) {
      firstItem.forEach((element, i) => {
        input[0].forEach(e => {
          output.push({
            ...element,
            ...e
          });
        });
      });
    } else {
      const nextOuput = [];
      firstItem.forEach(element => {
        output.map((e, i) => {
          nextOuput.push({ ...e, ...element });
        });
      });

      if (input[0]) {
        return buildModels(input, nextOuput);
      }
    }
    // this is in the case when it is the last item
  } else if (!input[0]) {
    // return the results
    if(!firstItem) return output;

    // if output is still empty it means the first iteration starts here
    // and that there was only one item to loop through
    if(output.length === 0) {
      firstItem.forEach((element, i) => {
        output.push({
          ...element,
        });
      });

      return output;
    } 
    const nextOuput = [];
    firstItem.forEach(element => {
      output.map((e, i) => {
        nextOuput.push({ ...e, ...element });
      });
    });

    // ENDING
    return nextOuput;
  }

  if (input) {
    input.shift();
  }

  return buildModels(input, output);
}

function format(input, base, optionnal) {
  const merged = mergeAll(input, optionnal);
  return base.map(value => ({
    ...value,
    ...merged
  }));
}

/**
 * @function getModels
 *
 * @param {Object} input
 * @returns {Array} models
 */
function getModels(input, optionnal = {}) {
  const values = getOnlyValues(input);
  const arrays = getOnlyArrays(input);

  const modelFromArrays = buildModels(arrays)

  return format(values, modelFromArrays, optionnal);
}

module.exports = getModels;
