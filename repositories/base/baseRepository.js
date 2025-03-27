import { DatabaseError } from "../../errors/implementations/databaseError.js";
export class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findOne(filter, projection, options) {
        try {
            return await this.model.findOne(filter, projection, options).exec();
        }
        catch (err) {
            throw new DatabaseError();
        }
    }
    async find(filter, projection, options) {
        try {
            return await this.model.find(filter, projection, options).exec();
        }
        catch (err) {
            throw new DatabaseError();
        }
    }
    async create(data) {
        try {
            const createdEntity = new this.model(data);
            return await createdEntity.save();
        }
        catch (err) {
            throw new DatabaseError();
        }
    }
    async update(options, data) {
        try {
            return await this.model
                .findOneAndUpdate(options, data, {
                upsert: true,
                new: true,
                collation: { locale: "en", strength: 2 },
            })
                .exec();
        }
        catch (err) {
            throw new DatabaseError();
        }
    }
    async deleteOne(options) {
        try {
            return await this.model.findOneAndDelete(options).exec();
        }
        catch (err) {
            throw new DatabaseError();
        }
    }
}
//# sourceMappingURL=baseRepository.js.map