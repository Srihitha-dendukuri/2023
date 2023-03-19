import React, {useState} from 'react'
import Apipage from './Apipage';
import Ims from './Ims';
function App() {  

  const [page, setPage] = useState(1);
  
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <form className="container-fluid justify-content-start">
          <button className="btn btn-outline-success me-2" type="button" onClick={()=>{setPage(1)}}>Inventory Management System</button>
          <button className="btn btn-sm btn-outline-secondary" type="button" onClick={()=>{setPage(0)}}>3rd-party API data</button>
        </form>
      </nav>
      <div className="container">
        {page?<Ims/>:<Apipage/>}
      </div>
    </>
  );
}


export default App;
