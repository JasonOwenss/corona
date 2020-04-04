import Head from 'next/head'
import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend } from 'recharts';
import TextFileReader from '../components/TextFileReader';
import datatxt from './data.json';

const data = datatxt
const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div>Home</div>
      <LineChart
          width={1000}
          height={800}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="days" />
          <YAxis  type="number" domain={[0, 5000000]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uninfected" stroke="#8884d8" />
          <Line type="monotone" dataKey="infected" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Recovered" stroke="#e64539" />
          <Line type="monotone" dataKey="Deaths" stroke="#c439e3" />
        </LineChart>
    </main>
  </div> 
)



export default Home
