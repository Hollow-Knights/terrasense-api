import mongoose from "mongoose"

async function dbConnect() {
  // eslint-disable-next-line no-undef
  mongoose.connect(process.env.DB_CONNECTION)

  return mongoose.connection
}

export default dbConnect