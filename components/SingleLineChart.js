import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';

const CustomizedAxisTick = props => {
    const { x, y, payload } = props
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} textAnchor='middle' fill='#666'>{payload.value + " days"}</text>
      </g>
    )
}

const SingleLineChart = props => (

    <LineChart 
        instanceId = "simulation plot"
        width={600}
        height={400}
        data={props.data[props.dataset]}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
        
        <XAxis dataKey="Days" unit="Days" tick={<CustomizedAxisTick />} />
        <YAxis  type="number" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.dataKey} stroke="#000000" animationBegin={0} animationDuration={10000} animationEasing="linear" />
    </LineChart>
)

export default SingleLineChart