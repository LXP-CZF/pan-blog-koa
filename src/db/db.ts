import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017'
const dbName = 'blogmongo' // 数据库名称

// mongoose.set('useCreateIndex', true)
// mongoose.set('useFindAndModify', true)

// 连接
mongoose.connect(`${url}/${dbName}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}, function(err){
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})

const conn = mongoose.connection

conn.on('error', error => {
    console.log(error)
})

export default mongoose