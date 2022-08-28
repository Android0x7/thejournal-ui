import * as React from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ecf9f2',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //verticalAlign: 'bottom',
    border: 'solid 1px black'
  }));

class Entries extends React.Component {    
    constructor(props) {
      super(props);
      //this.state = {entries: new Date()};
    }
  
    componentDidMount() {
    }
  
    componentWillUnmount() {
    }
  
    render() {

        //console.log(this.props);
        if(this.props !== undefined && this.props.data !== undefined && this.props.data.info !== undefined)
        {
        //return <h1>hello there</h1>
        return (
                (this.props.data.info).map(function(i, key) {
                return (<Item key={key}>{i.entry}</Item>);
                }));              
        }
  }
}
  export default Entries;
