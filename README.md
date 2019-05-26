# OBJECT-TRANSFORMER-MODEL

## WIP - WORK IN PROGRESS

Basicly my need where => I have x field with some of them wich are multi select,
once every field is filled i need to create dynamicly an array of models for the server to 
match the api schema. 
I built this in mind of not taking in account the keys of my specific need so it can be used 
with anything.

## try it
```bash=
# npm
$ npm install object-transformer-model

# yarn
$ yarn add object-transformer-model
```


## Example
This is some kinda of case i ran into, each `hobbies` should be a single element in the database... ! 

```javascript=
const getModels = require('object-transformer-model');

const selectFromForm = {
  name: 'André Gomes',
  age: '25',
  hobbies: ["Gaming", "Reading", "Programming", "Music"],
}

const models = getModels(selectFromForm);
/*
RESULT : 
  [
    {
      hobbies: 'Gaming',
      name: 'André Gomes',
      age: '25'
    },
    {
      hobbies: 'Reading',
      name: 'André Gomes',
      age: '25'
    },
    {
      hobbies: 'Programming',
      name: 'André Gomes',
      age: '25'
    },
    {
      hobbies: 'Music',
      name: 'André Gomes',
      age: '25'
    }
  ] 
*/
```

# Contribution
PR's and feedback are welcome !
