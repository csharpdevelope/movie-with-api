export const getVisiblePages = (currentPage: number, totalPage: number) => {
  var array: number[] = [];

  array.push(1);
  if (currentPage == 1) {
    array.push(2)
    array.push(3)
    array.push(0)
    array.push(totalPage);
    return array;
  }

  if (currentPage == totalPage) {
    array.push(0)
    array.push(totalPage-2)
    array.push(totalPage-1)
    array.push(totalPage);
    return array;
  }

  if (currentPage == 2) {
    array.push(currentPage);
    array.push(currentPage + 1);
    array.push(0);
    array.push(totalPage);
    return array;
  }

  if (currentPage == totalPage - 1) {
    array.push(0);
    array.push(currentPage - 1);
    array.push(currentPage);
    array.push(currentPage + 1);
    return array;
  }

  if (currentPage == totalPage - 2) {
    array.push(0);
    array.push(currentPage - 1);
    array.push(currentPage);
    array.push(currentPage + 1);
    array.push(currentPage + 2);
    return array;
  }

  if (currentPage > 1 && currentPage < totalPage) {
    if (currentPage != 3) {
      array.push(0)
    }
    array.push(currentPage-1);
    array.push(currentPage);
    array.push(currentPage+1);
    array.push(0);
    array.push(totalPage);
    return array;
  }

  return array;
};