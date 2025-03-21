import { Query, Model } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  public model: Model<T>;
  public totalCount: number = 0;
  public totalPages: number = 0;

  constructor(model: Model<T>, query: Record<string, unknown>) {
    this.model = model;
    this.modelQuery = model.find();
    this.query = query;
  }

  async totalCountDocuments() {
    this.totalCount = await this.model.countDocuments(
      this.modelQuery.getFilter(),
    );
    return this.totalCount;
  }

  search(searchableFields: string[]) {
    const search = this.query?.search || '';
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sort = this.query?.sort || '';
    if (sort) {
      const sortBy = sort.toString().split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }

  async paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    await this.totalCountDocuments();
    this.totalPages = Math.ceil(this.totalCount / limit);
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this.query?.fields || '';
    if (fields) {
      const fieldsBy = fields.toString().split(',').join(' ');
      this.modelQuery = this.modelQuery.select(fieldsBy);
    } else {
      this.modelQuery = this.modelQuery.select('-__v');
    }
    return this;
  }

  async build() {
    const result = await this.modelQuery.exec();
    return {
      result,
      total: this.totalCount,
      totalPage: this.totalPages,
    };
  }
}

export default QueryBuilder;
