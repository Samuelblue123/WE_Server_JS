//import userSchema, {IUser} from "../schemas/userSchema.js";
export class DatabaseModelFactory {
    db;
    constructor(db) {
        this.db = db;
    }
    static create(db) {
        return new DatabaseModelFactory(db);
    }
    //    createUserModel(): Model<IUser> {
    //        return this.createModel("User", userSchema);
    //    }
    createModel(name, schema) {
        return this.db.model(name, schema);
    }
}
//# sourceMappingURL=databaseModelFactory.js.map