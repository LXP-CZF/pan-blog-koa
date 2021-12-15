// Mongoose 的一切始于 Schema(模式)。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成
import { Schema } from "mongoose";
import mongoose from './db'

export type userType = {
  username: string;
  password: String;
  alias?: String;
  email?: String;
  gender: number;
  superAdmin?: boolean;
  [key: string]: any
}

const UserSchema = new Schema<userType>(
  {
    username: {
      type: String,
      required: true, // 必填
      unique: true, // 唯一，不重复
    },
    password: String,
    alias: String,
    email: String,
    gender: {
      type: Number,
      default: 0, // 0-保密，1-男，2-女
    },
    superAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)// 时间戳，自动添加文档的创建时间

// mongoose.model(表名, model)
const User = mongoose.model('userinfos', UserSchema)
export default User
