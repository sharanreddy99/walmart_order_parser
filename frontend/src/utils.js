const sortByKey = (objArr, key) => {
  const sortCmpFunc = (a, b) => {
    if (a["name"] < b["name"]) {
      return -1;
    }
    if (a["name"] > b["name"]) {
      return 1;
    }
    return 0;
  };

  objArr.sort(sortCmpFunc);
};

export { sortByKey };
