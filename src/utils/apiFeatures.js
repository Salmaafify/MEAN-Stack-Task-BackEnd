class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginate() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 5; 
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
      }
}

module.exports = APIFeatures