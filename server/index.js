const express = require("express");
const app = express();
app.listen(7000, () => console.log("Server is running"));
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require('cors');
app.use(cors())

app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix +'-'+ file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

mongoose.connect(
    'mongodb+srv://srihitha56:srihithapass@cluster0.q499noz.mongodb.net/?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    image: String
});
const Item = mongoose.model('Item', ItemSchema);


app.post('/save',upload.single('image'), (req, res) => {
    let image = (req.file)? req.file.filename:null
    let {name,quantity} = req.body
    const it = new Item({name,quantity,image});
    
    it.save().then(
        () => console.log("One entry added"), 
        (err) => console.log(err)
    );
    res.send(req.body)
})

app.post('/update',(req,res)=>{
    Item.findByIdAndUpdate(req.body._id, req.body).then((data)=>{
        console.log(data)
    })
    res.send('success')
})

app.get('/', (req, res) => {
    Item.find()
    Item.find({}).then((data) => {
        res.send(data);                
    }).catch(err => console.log("Error occured, " + err));
});
