# DYNAMIZE

## WIP - WORK IN PROGRESS

Basicly my need where => I have x field with some of them wich are multi select,
once every field is filled i need to create dynamicly an array of models for the server to 
match the api schema. 
I built this in mind of not taking in account the keys of my specific need so it can be used 
with anything.

## try it
```bash=
# npm
$ npm install dynamize

# yarn
$ yarn add dynamize
```


## Example

```javascript=
const getModels = require('dynamize');

const models = getModels(selectFromForm);
```

# Contribution
PR's and feedback are welcome !
