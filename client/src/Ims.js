
import React, { useState, useEffect } from 'react';


function Ims() {
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [image, setImage] = useState()

  const [update, setUpdate] = useState(0)
  const [_id, setId] = useState('');
  const [data, setData] = useState([])


  const [refresh, setRefresh] = useState([])

  const updateAction = (event) =>{
    console.log(event.target.value)
    event.preventDefault();
    setUpdate(1)
    setId(event.target.value.split(',')[0])
    setName(event.target.value.split(',')[1])
    setQuantity(event.target.value.split(',')[2])

  }
  const setFile = (event) =>{
    setImage(event.target.files[0])
  }
  const handleUpdate = (event) => {
    event.preventDefault();

    // Create a new object with the form data
    const formData = {
      _id,
      name,
      quantity
    };

    // Send the form data to the API using fetch
    fetch('http://localhost:7000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    refresh?setRefresh(0):setRefresh(1);
    alert('Form Updated ! ');
    setUpdate(0)



  }
  const handleSubmit = (event) => {
    console.log(image)
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("image", image, image.name);
  
    // Send the form data to the API using fetch
    fetch('http://localhost:7000/save', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      console.log(refresh)
    
      refresh?setRefresh(0):setRefresh(1);
      console.log(refresh)
    alert('Form Submitted ! ');
  };

  
    useEffect(() => {

      fetch('http://localhost:7000/')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setData(response)
        if(response.length==0)alert('empty inventory');
      })
      .catch(err => console.error(err));
    },[refresh])
  

  return (
    <>
    <div className="container" >

      <form onSubmit={update?handleUpdate:handleSubmit}>
        {update?<h1>Update Data</h1>:<h1>Add New Data</h1>}
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="Quantity" className="form-label">Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="form-control"/>
        </div>
        {update?
        <input hidden type="text" value={_id} className="form-control"/>: <></>}
        <div class="input-group mb-3">
          <input type="file" class="form-control" id="inputGroupFile02" onChange={setFile}/>
          <label class="input-group-text" for="inputGroupFile02">Upload</label>
        </div>

        {update?
        <button type="submit" value='submit' className="btn btn-primary">Update</button>:
        <button type="submit" value='submit' className="btn btn-primary">Submit</button>}


      </form>
      
      <h1 className='my-5'>Inventory</h1>
      <table class="table">
        <thead>
          <tr>
            <th hidden scope="col">id#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(data => <Data data={data} func={updateAction} />)
          }
        </tbody>
      </table>
    </div>
    </>
  );
}
function Data(props){
  return(
    <tr key={props.data._id}>
      <th hidden scope='row'>{props.data._id}</th>
      <td><img src={`uploads/${props.data.image}`} className="img-thumbnail" width={100} height={100} alt="..."/></td>
      <td> {props.data.name}</td>
      <td> {props.data.quantity}</td>
      <td> <button value={[props.data._id,props.data.name,props.data.quantity]} type="button" class="btn btn-warning" onClick={props.func}>Update</button></td>
    </tr>
  )
}

export default Ims