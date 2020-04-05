import Head from 'next/head'
import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';
import datatxt from './data.json';
import {VictoryChart,VictoryLine, VictoryTheme} from 'victory';
import SimChart from '../components/SimChart';


const Home = () => (
  <div className="container">
    
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div>Home</div>
      
      <SimChart data={datatxt}/>
    </main>
  </div> 
)



export default Home
