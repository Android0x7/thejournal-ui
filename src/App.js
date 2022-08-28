import logo from './logo.svg';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';  
import Stack from '@mui/material/Stack';
//import Item from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from "react";
import { useEffect } from 'react';
import Entries from './Entries'

function Text(props){
  const [text, setText] = React.useState();

  return <TextField value={props.text} onChange={ (e) => {} } 
          style={{width: '100%', height: '15px' }} multiline={true} 
          rows={1} id="txtLog" label="Add text here !" variant="outlined" />                            

}

function App() {
  const [stateData, setStateData] = React.useState();
  
  useEffect(() => {
    listJournal();
  }, []);

  const darkModeTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const addJournal = (e) => {
      var je = {  
                "Entry": stateData.text,
                "TimeStamp" : new Date().toDateString(),
                "Tags" : ["general"]                
      };

      fetch('https://localhost:44325/api/journal', {
        method: 'POST',
        //dataType: "json",
        //mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8" 
      },
        body: JSON.stringify(je)
      })
      //.then(res => res.json())
      .then(
        (result) => {
          listJournal();
          //setEntries(result);
          //setValue('');
        },

        (error) => {

          //setValue('');
        }
      )              
  };

  const listJournal = () => {
    fetch("https://localhost:44325/api/journal")
      .then(res => res.json())
      .then(
        (result) => {
          //setStateData ({data:result});
          setStateData ({info: result, text : ''});
        },
        (error) => {
          console.log(error);
        }
      )      
  };

  const fnTextValue = () => {  
    if(stateData !== undefined && stateData.text !== undefined)
      return stateData.text;
    
      return '';
  };

  return (
    
    <ThemeProvider theme={darkModeTheme}>
      <div className="App">
        
        <header className="App-header">          
          <p>
            Welcome to The Journal!
          </p>
        </header>

        <Box padding={'1%'} >
          <form>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Entries data={stateData} />                
              </Stack>
            </Grid>
            <Grid item xs={11}>
                  <TextField value={ fnTextValue() } onChange={ (e) => { setStateData(prevState => ({ ...prevState, text : e.target.value  })) } } 
                      style={{width: '100%', height: '15px' }} multiline={true} 
                      rows={1} id="txtLog" label="Add text here !" variant="outlined" /> 
            </Grid>
            <Grid item xs={1}>                            
              <Button onClick={ (e) => addJournal(e)}  style={{height: '55px' }} variant="contained">Log</Button>              
            </Grid>
          </Grid>
          </form>
        </Box>        
      </div>
      </ThemeProvider>
  );
}

export default App;
