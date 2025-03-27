import UserModel from "../models/entities/userModel.js";
import { BaseRepository } from "./base/baseRepository.js";
export class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
}
//# sourceMappingURL=userRepository.js.map