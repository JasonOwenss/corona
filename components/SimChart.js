import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';

const CustomizedAxisTick = props => {
    const { x, y, payload } = props
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} textAnchor='middle' fill='#666'>{payload.value}</text>
      </g>
    )
  }



class SimChart extends React.Component{
  constructor(props){
    super(props);
    this.state= {value: "1"};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <div>
        <div>
          <select value={this.state.value} id="selectBox" onChange={this.handleChange}>
            <option value="1">R=1</option>
            <option value="2">R=2</option>
            <option value="3">R=3</option>
          </select>
          <select>
            <option value="1">R=1</option>
            <option value="2">R=2</option>
            <option value="3">R=3</option>
          </select>
        </div>

        <LineChart 
            instanceId = "simulation plot"
            width={600}
            height={400}
            data={this.props.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            
            <XAxis dataKey="days" unit="days" tick={<CustomizedAxisTick />} />
            <YAxis  type="number" domain={[0, 5000000] }/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uninfected" stroke="#8884d8" />
            <Line type="monotone" dataKey="infected" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Recovered" stroke="#e64539" />
            <Line type="monotone" dataKey="Deaths" stroke="#c439e3" />
        </LineChart>
      </div>
    );
  }

}
    
	




export default SimChart;