import mongoose from "mongoose";


//Database network Connect
const conn =() => {
    mongoose
    .connect(process.env.DB_URI, {
        dbName: 'hirestuff',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('connected to the DB Succesfuly')
        })
        .catch((err) => {
            console.log(`DB Connection err: , ${err}`)
        })
        

}
export default conn;