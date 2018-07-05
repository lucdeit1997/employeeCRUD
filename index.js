const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Eployee = require('./models/Employe')
var bodyParser = require('body-parser')
const UserRouter = require('./router/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/nguoi-dung',UserRouter);


app.get('/', (req, res) =>{
     res.redirect('/danh-sach-nhan-vien');
})
app.post('/them-nhan-vien', (req, res) =>{
    const dataEmployee = req.body;
    const tempData = new Eployee({
        fullName: dataEmployee.fullName,
        age     : dataEmployee.age,
        address : dataEmployee.address
    })
    tempData.save().then((data)=>{
        res.json(data);
    }).catch(error =>{
        res.json(error);
    })
})
app.get('/danh-sach-nhan-vien',( req, res )=>{

    Eployee.find({}).then(data =>{
        res.render('index', {data: data})
    }).catch(error =>{
        res.json(error)
    })
})
app.get('/sua-nhan-vien/:EmployeId',( req, res ) =>{
    const { EmployeId } = req.params;
    Eployee.findOne({ _id: EmployeId })
    .then(data =>{
        res.json(data);
    }).catch(error =>{
        res.json(error);
    })
})

app.post('/sua-nhan-vien/:EmployeId',(req, res)=>{
    const { EmployeId } = req.params;
    const dataEmployee = req.body;   
    Eployee.findByIdAndUpdate({ _id: EmployeId },{
        fullName: dataEmployee.fullName,
        age     : dataEmployee.age,
        address : dataEmployee.address
    }, {new: true}).then(data =>{
        res.json(data);
    }).catch(error =>{
        res.json({
            error: true,
            message: error.message
        });
    })
})

app.get('/xoa-nhan-vien/:EmployeId', (req, res)=>{
    const { EmployeId } = req.params;
    Eployee.findByIdAndRemove({ _id : EmployeId })
    .then(()=>{ 
        res.redirect('/danh-sach-nhan-vien');
    })
    .catch(err =>{
        res.json(err)
    })
})

const port = process.env.PORT || 3000;
const uri = 'mongodb://localhost/EployeeCRUD'
mongoose.connect(uri);
mongoose.connection.once('open', ()=>{
    app.listen(port, () => console.log('Server started at port 3000'));
})