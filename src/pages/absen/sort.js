const sort = (data, type) => {
  if (type == "tanggal-desc") {
    return data.sort((a, b) => {
      console.log(a.tanggal);
      var nameA = a.tanggal; // ignore upper and lowercase
      var nameB = b.tanggal; // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else if (type == "tanggal-asc") {
    return data.sort((a, b) => {
      var nameA = a.tanggal; // ignore upper and lowercase
      var nameB = b.tanggal; // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else {
    return data;
  }
};

export { sort };
