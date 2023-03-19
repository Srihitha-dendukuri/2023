import React, {useState,useEffect} from 'react'

function Apipage() {
  const [userData, setUserData] = useState([])
  
  useEffect(()=>{

    fetch('https://random-data-api.com/api/v2/users?size=30&is_xml=true')
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setUserData(response)
    })
    .catch(err => console.error(err));
  },[])

  return (
    <div className="container" >
      <h1 className='my-5'>Random-UserData API Usage</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">DOB</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Employment Title</th>
            <th scope="col">Key Skill</th>
          </tr>
        </thead>
        <tbody>
          {
            userData.map(userData => <User data={userData}/>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Apipage


function User(props){
  return(
    <tr key={props.data.id}>
      <th scope='row'>{props.data.id}</th>
      <td> {props.data.first_name}</td>
      <td> {props.data.last_name}</td>
      <td> {props.data.username}</td>
      <td> {props.data.email}</td>
      <td> {props.data.date_of_birth}</td>
      <td> {props.data.phone_number}</td>
      <td> {props.data.employment.title}</td>
      <td> {props.data.employment.key_skill}</td>
    </tr>
  )
}