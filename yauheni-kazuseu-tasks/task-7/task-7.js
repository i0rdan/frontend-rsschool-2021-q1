let test = {
    item1: 1,
    item2: {
        item2_1: 21,
        item2_2: '22',
        item2_3: {
            item2_3_1: 231,
            item2_3_2: '232'
        }
    },
    item3: 'item3',
    item4: {
        item4_1: 41,
        item4_2: {
            item4_2_1: 421,
            item4_2_2: '422'
        }
    },
    item5: 5
};

function dClone(obj) {
  let clone = {};
  for(let i in obj) {
    if (obj[i] instanceof Object) clone[i] = dClone(obj[i]);
    clone[i] = obj[i];
  }
  return clone;
}

let res = dClone(test);

console.log(res);