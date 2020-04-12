import { LineChart, Line, XAxis,YAxis,Tooltip,CartesianGrid,Legend, ScatterChart } from 'recharts';
import SimpleLineChart from './SimpleLineChart';
import SingleLineChart from './SingleLineChart';

const CustomizedAxisTick = props => {
  const { x, y, payload } = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={16} textAnchor='middle' fill='#666'>{payload.value + " days"}</text>
    </g>
  )
}


class SimChart extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      key: 1,
      dataset: "0-LD-0-day-SI"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({dataset: event.target.value, key: this.state.key + 1});
  }

  render() {
    return(
      <div>
        <div>
          <select className="form-control " value={this.state.dataset} id="selectBox" onChange={this.handleChange}>
            <option value="0-LD-0-day-SI">No lock-down and no self isolation</option>
            <option value="0-LD-3-day-SI">No lock-down and self isolation 3 days after symptoms</option>
            <option value="28-LD-3-day-SI">28 day lock-down and self isolation 3 days after symptoms</option>
            <option value="35-LD-1-day-SI">35 day lock-down and self isolation 1 day after symptoms</option>
            <option value="35-LD-3-day-SI">35 day lock-down and self isolation 3 days after symptoms</option>
          </select>
          
        </div>
        <div className="row">
          <div >
            <SimpleLineChart key={this.state.key} data={this.props.data} dataset={this.state.dataset}/>
          </div>
          <div>
            <SingleLineChart key={this.state.key+10} data={this.props.data} dataset={this.state.dataset} dataKey={"Deaths"}/>
          </div>
        </div>
        <div className="row">
          <div>
            <SingleLineChart key={this.state.key+20} data={this.props.data} dataset={this.state.dataset} dataKey={"Infected"}/>
          </div>
        </div>
        
      </div>
    );
  }

}
    
	




export default SimChart;