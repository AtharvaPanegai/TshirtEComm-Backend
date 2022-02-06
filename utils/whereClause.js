/** @format */

// base = product.find()
// bigQ = search=coder&page=2&category=shortsleeves&rating[gte]=4&price[lte]=999&price[gte]=199&limit=2

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

  //   filtering product based on mongoDB Operators
  filter() {
    const copyQ = { ...this.bigQ };
    delete copyQ["search"];
    delete copyQ["limit"];
    delete copyQ["page"];

    // convert bigQ in string => copyQ
    let stringofCopyQ = JSON.stringify(copyQ);
    stringofCopyQ = stringofCopyQ.replace(/\b(gte|lte|gt|lt)/g, (m) => `$${m}`);

    let jsonOfCopyQ = JSON.parse(stringofCopyQ);

    this.base = this.base.find(jsonOfCopyQ);

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

module.exports = WhereClause;
