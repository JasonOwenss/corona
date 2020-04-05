import jdata from '../pages/data.json'
import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';
const CustomizedAxisTick = props => {
    const { x, y, payload } = props
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} textAnchor='middle' fill='#666'>{payload.value}</text>
      </g>
    )
  }

const SimChart = (props) => (
    <div>
        <LineChart 
            instanceId = "simulation plot"
            width={600}
            height={400}
            data={props.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            
            <XAxis dataKey="days" unit="days" tick={<CustomizedAxisTick />} />
            <YAxis  type="number" domain={[0, 5000000]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uninfected" stroke="#8884d8" />
            <Line type="monotone" dataKey="infected" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Recovered" stroke="#e64539" />
            <Line type="monotone" dataKey="Deaths" stroke="#c439e3" />
        </LineChart>
    </div>
	
)



export default SimChart;