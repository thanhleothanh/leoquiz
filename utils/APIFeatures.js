const queryReserved = ['sort', 'page', 'limit', 'fields'];

class APIfeatures {
  constructor(query, reqquery) {
    this.query = query;
    this.reqquery = reqquery;
  }

  filter() {
    let queryObj = { ...this.reqquery };
    queryReserved.forEach((e) => delete queryObj[e]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.reqquery.sort) {
      const sortBy = this.reqquery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fields() {
    if (this.reqquery.fields) {
      const fields = this.reqquery.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v -createdAt');
    }
    return this;
  }

  pageLimit() {
    const page = this.reqquery.page * 1 || 1;
    const skip = (page - 1) * 10;
    this.query = this.query.skip(skip).limit(10);
    return this;
  }
}

module.exports = APIfeatures;
