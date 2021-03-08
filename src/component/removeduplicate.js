function removeDuplicates(array, key) {
    return array.reduce((accumulator, element) => {
        if (!accumulator.find(el => el[key] === element[key])) {
          accumulator.push(element);
        }
        return accumulator;
      }, []);
  }

  export default removeDuplicates