const fs = require('fs');

const provinceContent = fs.readFileSync('./province.txt', 'utf8');
const cityContent = fs.readFileSync('./city.txt', 'utf8');


const provinceArray = provinceContent.split(/\r?\n/ig);
provinceArray.splice(-1, 1);


const cityArray = cityContent.split(/\r?\n/ig);
cityArray.splice(-1, 1);


const result = provinceArray.map(v => ({
  pro: { key: v.split(',')[0], province: v.split(',')[1] },
  citys: cityArray.filter((k) => {
    if (k.split(',')[2] === v.split(',')[0]) {
      return true;
    }
    return false;
  }),

}));

console.log(result);

