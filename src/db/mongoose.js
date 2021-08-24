const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://SalmaMongo:SalmaMongo123@cluster0.06n0o.mongodb.net/Contacts?retryWrites=true&w=majority'
//const dbUrl = 'mongodb://127.0.0.1:27017/Contacts'
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})