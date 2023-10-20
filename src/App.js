import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import './App.css';
import { Done } from '@mui/icons-material';






function Tasks ({plan, done, handleDeletePlan, handleCheckPlan, handleDeleteDone, handleCheckDone, handleEditTask, handleSaveTask}) {

  const [newText, setNewText] = useState("")
  console.log(plan);
  if(plan.length > 0 && done.length > 0){
    return(


        <>
          <div className='planText'>
            <Typography variant="capture" gutterBottom="False"> ПЛАН ({plan.length}) </Typography>
          </div>

          {plan.map(el=>(

            el.edit
            ?
            <div className='editTask' key={el.id} id={el.id}>
              <div className='editTask'>
                <TextField onChange={(e)=>{setNewText(e.target.value)}} size='small' style={{height:"20px"}} fullWidth label="Редактировать задачу" className='fullWidth' />
                <IconButton onClick={()=>{handleSaveTask(el.id, newText)}}>
                  <Done />
                </IconButton>
              </div>
            </div>
            :
            <div className='planTask' key={el.id} id={el.id}>
              <Checkbox onChange={()=>{handleCheckPlan(el.id)}} size='small' color='info' /> <Typography variant='body1' className='textTask'>{el.text}</Typography>
              <div className='planButtons'>
                <IconButton onClick={()=>{handleEditTask(el.id)}}>
                  <CreateIcon size='small' fontSize='small' color='info' state='enabled' />
                </IconButton>
                <IconButton onClick={()=>{handleDeletePlan(el.id)}}>
                  <DeleteIcon size='small' fontSize='small' color='warning' state='enabled' />
                </IconButton>
              </div>
            </div>
          ))}
          


          <div className='planText'>
            <Typography variant="capture" gutterBottom="False"> ГОТОВО ({done.length}) </Typography> 
          </div>

          {done.map(el=>(
            <div className='planTask' key={el.id} id={el.id}>
              <Checkbox onChange={()=>{handleCheckDone(el.id)}} defaultChecked size='small' color='info' /> <Typography variant='body1' className='textTask'>{el.text}</Typography>
              <div className='planButtons'>
                <IconButton onClick={()=>{handleDeleteDone(el.id)}}>
                  <DeleteIcon size='small' fontSize='small' color='warning' state='enabled' />
                </IconButton>
              </div>
            </div>
          ))}



        </>



    )} else if (plan.length > 0 && done.length < 1){
    return(



      <>    
          <div className='planText'>
            <Typography variant="capture" gutterBottom="False"> ПЛАН ({plan.length}) </Typography>
          </div>

          {plan.map(el=>(
            el.edit
            ?
            <div className='editTask' key={el.id} id={el.id}>
              <div className='editTask'>
                <TextField onChange={(e)=>{setNewText(e.target.value)}} size='small' style={{height:"20px"}} fullWidth label="Редактировать задачу" className='fullWidth' />
                <IconButton onClick={()=>{handleSaveTask(el.id, newText)}}>
                  <Done />
                </IconButton>
              </div>
            </div>
            :
            <div className='planTask' key={el.id} id={el.id}>
              <Checkbox onChange={()=>{handleCheckPlan(el.id)}} size='small' color='info' /> <Typography variant='body1' className='textTask'>{el.text}</Typography>
              <div className='planButtons'>
                <IconButton onClick={()=>{handleEditTask(el.id)}}>
                  <CreateIcon size='small' fontSize='small' color='info' state='enabled' />
                </IconButton>
                <IconButton onClick={()=>{handleDeletePlan(el.id)}}>
                  <DeleteIcon size='small' fontSize='small' color='warning' state='enabled' />
                </IconButton>
              </div>
            </div>
          ))}


      </>  
    )
  }else if (plan.length < 1 && done.length > 0){
    return(
      <>



        <div className='planText'>
            <Typography variant="capture" gutterBottom="False"> ГОТОВО ({done.length}) </Typography> 
          </div>

          {done.map(el=>(
            <div className='planTask' key={el.id} id={el.id}>
              <Checkbox onChange={()=>{handleCheckDone(el.id)}} defaultChecked size='small' color='info' /> <Typography variant='body1' className='textTask'>{el.text}</Typography>
              <div className='planButtons'>
                <IconButton onClick={()=>{handleDeleteDone(el.id)}}>
                  <DeleteIcon  size='small' fontSize='small' color='warning' state='enabled' />
                </IconButton>
              </div>
            </div>
          ))}



      </>
    )
  }



}

let nextId = 0

function App() {
  const [textVal, setTextVal] = useState("")
  const [planArray, setPlanArray] = useState([])
  const [doneArray, setDoneArray] = useState([])
  const [doneIdList, setDoneIdList] = useState(false)




  function handleAddTask () {

    if(textVal !== "" && textVal.trim() !== "" ){
      setPlanArray([
        ...planArray,
        {
          edit:false,
          text:textVal,
          id:nextId++
        }
      ])
    }
    
  }
  function handleEditTask (id) {
    setPlanArray(
      planArray.map(el => {
        if(el.id === id){
          const newObj = {...el}
          newObj.edit = true
          return newObj
        }else{
          return el
        }
        console.log(el)
      })
    )

    
  }
  function handleSaveTask (id, payload) {

    setPlanArray(
      planArray.map(el => {
        if(el.id === id){
          const newObj = {...el}
          newObj.edit = false
          newObj.text = payload
          return newObj
        }else{
          return el
        }
      })
    )
    
    
  }

  function handleDeletePlan (id){
    console.log(id)
    setPlanArray(
      planArray.filter(el => el.id !== id)
    )
  }

  function handleCheckPlan(id){
    setDoneArray([
      planArray.filter(el => el.id === id)[0],
      ...doneArray,
      
    ])
    handleDeletePlan(id)
  }

  function handleDeleteDone (id){
    setDoneArray(
      doneArray.filter(el => el.id !== id)
    )
  }

  function handleCheckDone (id){
    setPlanArray([
      ...planArray,
      doneArray.filter(el => el.id === id)[0],
      
      
    ])
    handleDeleteDone(id)

  }

  


  return(
    <>

      <Box 
        sx={{
          height:"90dvh",
          width: 514,
          position: "absolute",
          top:"50%", right:"50%",
          transform: "translate(50%, -50%)",
          border: "1px solid black",
          borderRadius:"3px",
          display:"flex",
          flexDirection: "column",
          overflow:"auto",
          overflowX:"hidden"
        }}>
          <div id='mainDiv'>
            <Typography variant="h4" className='todoText'>TODO</Typography>
            <div className='addTask'>
              <TextField onChange={(e)=>{setTextVal(e.target.value)}} fullWidth label="Имя новой задачи" className='fullWidth' />
              <IconButton onClick={()=>{handleAddTask()}}>
                <AddIcon />
              </IconButton>
            </div>
          </div>


        <Tasks handleSaveTask={handleSaveTask} handleEditTask={handleEditTask} handleCheckDone={handleCheckDone} handleCheckPlan={handleCheckPlan} handleDeleteDone={handleDeleteDone} handleDeletePlan={handleDeletePlan} plan={planArray} done={doneArray} />


      </Box>

      
    </>
  )
  
}

export default App;
