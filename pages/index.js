import Head from 'next/head'
import data from '../data/data.json';
import SimChart from '../components/SimChart';
import Button from 'react-bootstrap/Button';



const Home = () => (
  <div className="container-fluid">

    <Head>
      <title>Corona</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/> 
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/> 
    </Head>

    <main>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-default ">
          <a className="navbar-brand">Navbar</a>
        </nav>
      </div>
      <div className="row">
        <div className="col">
        </div>
        <div className="col-8">
          <SimChart data={data}/>
        </div>
        <div className="col">
        </div>
      </div>
      
    </main>
    <style jsx>{`
     .navbar-default {
        background-color: #FFFFFF;
        border-color: #FFFFFF;
      } 
     
		`}</style>
    
  </div> 
)



export default Home
