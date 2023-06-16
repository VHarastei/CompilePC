// has 2 main columns, each also has 2 colums, 1 - spec, 2 - value
// has categories, like: Main, General, GPU, RAM...
// https://ek.ua/en/ASUS-GEFORCE-RTX-3060-DUAL-V2-OC-LHR.htm
const cleanComplexTable = (rawSpecsTable: any) => {
  const cleanedSpecsTable = rawSpecsTable.split('\n');

  let sockets = '';

  const normalizedSpecsTable = cleanedSpecsTable.filter((item: string) => {
    if (item.includes('Socket')) {
      const indexOfSocketSpec = cleanedSpecsTable.indexOf(item);

      const lastIndexOfSocketSpec = cleanedSpecsTable.indexOf(
        '',
        indexOfSocketSpec,
      );

      sockets = item;

      cleanedSpecsTable.forEach((spec: string, specIndex: number) => {
        if (
          specIndex > indexOfSocketSpec &&
          specIndex < lastIndexOfSocketSpec &&
          !spec.includes('\t')
        ) {
          sockets += `, ${spec}`;
        }
      });
    }

    return item.includes('\t');
  });

  const result = normalizedSpecsTable.map((item: string) =>
    item.includes('Socket') ? sockets : item,
  );

  return result;
};

export default cleanComplexTable;
