const ExportJsonExcel = require('js-export-excel');


const exportExcel = () => {
  debugger;
  const option = {};

  option.fileName = 'excel';
  option.datas = [
    {
      sheetData: [{ one: '一行一列', two: '一行二列' }, { one: '二行一列', two: '二行二列' }],
      sheetName: 'sheet',
      sheetFilter: ['two', 'one'],
      sheetHeader: ['第一列', '第二列'],
    },
    {
      sheetData: [{ one: '一行一列', two: '一行二列' }, { one: '二行一列', two: '二行二列' }],
    },
  ];
  const toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
};

export default exportExcel;
