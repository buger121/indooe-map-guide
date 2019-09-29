const mongoose = require('mongoose')
const Schema = mongoose.Schema

class DbBase{
    constructor(){
        this.url = 'mongodb://49.235.168.9:27017/map'
        this.connect = this.connect.bind(this)
        this.infoSchema = new Schema({
            destination: String,
            location: String
        })
    }

    connect(){
        mongoose.connect(this.url, {useNewUrlParser: true})
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', function(){
            console.log("数据库连接成功")
        })
    }

    insert(infoObj){
        return new Promise((resolve) => {
                const Info = mongoose.model('Info', this.infoSchema)
                Info.create(infoObj, function(err, result) {
                if(err) {
                    console.log(err)
                    return
                }
                resolve(result)
            })
        })
    }

    find(){
        return new Promise((resolve) => {
            const Info = mongoose.model('Info', this.infoSchema)
            Info.find({})
            .sort({_id: -1}).
            limit(1)
            .exec(function(err, result) {
                resolve(result[0])
            })
        })
    }
}

export default new DbBase()