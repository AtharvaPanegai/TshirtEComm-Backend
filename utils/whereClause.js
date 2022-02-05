/** @format */

// base = product.find()
// bigQ = search=coder&page=2&category=shortsleeves&rating[gte]=4&price[lte]=999&price[gte]=199

class WhereClause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }

  search() {
    const searchKeyWord = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,
            $options: "g",
          },
        }
      : {};

    this.base = this.base.find({ ...searchKeyWord });

    return this;
  }

  pager(resultperPage) {
    let currentPage = 1;
    // if we're getting query as page 2 then we have to update that
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    const skipVal = resultperPage * (currentPage - 1);

    this.base = this.base.limit(resultperPage).skip(skipVal);

    return this;
  }
}
