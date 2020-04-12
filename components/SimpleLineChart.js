import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';

const CustomizedAxisTick = props => {
    const { x, y, payload } = props
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} textAnchor='middle' fill='#666'>{payload.value + " days"}</text>
      </g>
    )
}

const SimpleLineChart = props => (

    <LineChart 
        instanceId = "simulation plot"
        width={600}
        height={400}
        data={props.data[props.dataset]}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
        
        <XAxis dataKey="Days" unit="Days" tick={<CustomizedAxisTick />} />
        <YAxis  type="number" domain={[0, 5000000] }/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Uninfected" stroke="#8884d8" animationBegin={0} animationDuration={10000} animationEasing="linear"  />
        <Line type="monotone" dataKey="Infected" stroke="#82ca9d" animationBegin={0} animationDuration={10000} animationEasing="linear" />
        <Line type="monotone" dataKey="Recovered" stroke="#e64539" animationBegin={0} animationDuration={10000} animationEasing="linear" />
        <Line type="monotone" dataKey="Deaths" stroke="#c439e3" animationBegin={0} animationDuration={10000} animationEasing="linear" />
    </LineChart>
)

export default SimpleLineChart