import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// @mui
import { Grid, Button, Container, Stack, Typography, Paper, CircularProgress, Modal, Fade, Box, List, ListItem, ListItemIcon, ListItemText, TextField, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../components/iconify';

// Modal Style
const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
  border: '0px solid black',
};

// Circular Progress of Step's Completion
const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

// Init Steps
const steps = [
  {
    id:"1",
    type: "p",
    title: 'Personal Information',
    info: {
      name: 'Amirhossein Sefati',
      email: 'example@gmail.com',
      phone: '+989153334444',
      linkedIn: 'linkedin.com/in/example'
    },
    progress: 0
  },
  {
    id:"2",
    type: "i",
    title: 'Interests',
    info: [
      {
        id: '132hhd',
        title: "Networks",
      }
    ],
    structure: {
      title: "Your Interest"
    },
    progress: 0
  },
  {
    id:"3",
    type: 'e',
    title: 'Education',
    info: [
      {
        id: "2h3ff3",
        title: "University of Calgary",
        fieldName: "Computer Science",
        degreeLevel: "Master of Science",
        gpa: "3.8",
        location: "Calgary, Canada",
        startYear: "2021",
        endYear: "2023",
        thesisTitle: "Smart Systems"
      }
    ],
    structure: {
      title: "Your University",
      fieldName: "Your Field",
      degreeLevel: "Your Degree Level",
      gpa: "Your GPA (from 4.0)",
      location: "Your City, Country",
      startYear: "Starting Year",
      endYear: "Ending Year",
      thesisTitle: "Your Thesis Title"
    },
    progress: 0
  },
  {
    id:"4",
    type: "w",
    title: 'Work Experience',
    info: [
      {
        id: "2h3wf3",
        title: "IBM",
        jobTitle: "Full Stack Developer",
        duties: ["Developing SWIM project with React, Express, and IBM DB2"],
        location: "Tehran, Iran",
        startYear: "2019",
        endYear: "2020",
      },
    ],
    structure: {
      title: "Company Name",
      jobTitle: "Your Job Title",
      duties: "Duties in your job",
      location: "City, Country of Company",
      startYear: "Starting Year",
      endYear: "Ending Year",
    },
    progress: 0
  },
  {
    id:"5",
    type: "pstch",
    title: 'Projects',
    info: [
      {
        id: "22dff3",
        title: "Smart IoT",
        description: "blah blah blah",
        date: "2019"
      }
    ],
    structure: {
      title: "Project Title",
      description: "Short Description of Project",
      date: "Year",
    },
    progress: 0
  },
  {
    id:"6",
    type: "s",
    title: 'Skills',
    info: [
      {
        id: "2h8ff3",
        title: "Python",
        description: "I use it for Machine Learning, Data Analysis, and Web development.",
        libraries: ["Tensorflow", "Flask", "Pandas"],
      }
    ],
    structure: {
      title: "Skill Title",
      description: "Short Description of Skill",
      libraries: "Name of libraries/frameworks",
    },
    progress: 0
  },
  {
    id:"7",
    type: "pstch",
    title: 'Selected Courses',
    info: [
      {
        id: "2h3fr3",
        title: "Advanced Computer Programming",
        description: "blah blah blah",
        type: "in-person",
        date: "2019",
        grade: "4"
      }
    ],
    structure: {
      title: "Course Title",
      description: "Short Description of Course",
      type: "in-person or online?",
      date: "Year",
      grade: "Grade (from 4.0)"
    },
    progress: 0
  },
  {
    id:"8",
    type: "pstch",
    title: 'Honors',
    info: [
      {
        id: "2h3df3",
        title: "Advanced Computer Programming",
        date: "2019",
      },
    ],
    structure: {
      title: "Honor Title",
      date: "Year",
    },
    progress: 0
  },
  {
    id:"9",
    type: "pstch",
    title: 'Teaching Experience',
    info: [
      {
        id: "2h3ff9",
        title: "Advanced Computer Programming blah blah blah blah",
        description: "blah blah blah",
        type: "in-person",
        date: "2019",
      }
    ],
    structure: {
      title: "Teaching Course Title",
      description: "Short Description of Teaching Course",
      type: "in-person or online?",
      date: "Year",
    },
    progress: 0
  },
  {
    id:"10",
    type: "l",
    title: 'Language Proficiency',
    info: [
      {
        id: "245ff3",
        title: "English",
        score: "100",
        exam: "TOEFL",
        level: "Fluent",
        date: "August 2020"
      }
    ],
    structure: {
      title: "Language Name",
      exam: "The exam name you took",
      score: "Your exam score",
      date: "Year",
      Level: "Basic, Intermediate, or Fluent"
    },
    progress: 0
  },

]

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop:'24px',
    paddingBottom:'24px'
  },
  section: {
    margin: '12px 25px 20px 25px',
    flexDirection:'row'
  },
  row: {
    flexDirection:'row'
  },
  column: {
    flexDirection:'column'
  },
  iah: {
    margin: '12px 25px 5px 25px',
    flexDirection:'column'
  }
});

export default function CVCreatorPage() {
  const mdUp = useResponsive('up', 'md');

  const [stepsList, setStepsList] = useState(JSON.parse(localStorage.getItem("resume_cv")) || steps)

  const handleDragEndToSortSteps = (result) => {
    if (!result.destination) return

    const stepItems = Array.from(stepsList)
    const [reorderedItem] = stepItems.splice(result.source.index, 1)
    stepItems.splice(result.destination.index, 0, reorderedItem)

    setStepsList(stepItems)
  }



  // Create Document Component
  const MyDocument = () => (
    <Document title='Your Resume (CV)' author="KoochAI" subject="CV" creator="Kooch" producer="Kooch" >
      <Page size="A4" style={styles.page}>
        <View>
          {stepsList.map(step => {
            return(
              <>
                {step.type==="p"&&
                
                  <View style={styles.section} wrap={false} key={step.id}>
                    <Text style={{fontSize:'24px', width:'360px', color:'#006896'}}>{step.info.name}</Text>                     
                    <View style={{flowDirection:'column',}}>
                      <Text style={{fontSize:'12px',}}>
                        Email: {step.info.email}
                      </Text>
                      <Text style={{fontSize:'12px'}}>
                        Phone: {step.info.phone}
                      </Text>
                      <Text style={{fontSize:'12px'}}>
                        LinkedIn: {step.info.linkedIn}
                      </Text>
                    </View>
                  </View>
                  
                }
                {step.type==="i"&&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'360px', color:'#006896'}}>{step.title}</Text> 
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(interest => (
                          <Text style={{fontSize:'12px',marginBottom:'6px'}} key={interest}>
                            &#8226; {interest.title}
                          </Text>
                        ))
                      }    
                    </View>
                  </View>
                }
                {step.type==="e" &&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896'}}>{step.title}</Text>  
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(education => (
                          <View style={[styles.column, {marginBottom:'6px'}]} key={education.title}>
                            <View style={styles.row}>
                              <Text style={{fontSize:'14px', fontWeight:'extrabold', width:'440px'}}>
                                {education.title}
                              </Text>
                              <Text style={{fontSize:'11px',}}>
                                {education.location}
                              </Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'12px', width:'440px'}}>
                                {education.degreeLevel}, {education.fieldName}. <Text style={{fontWeight:'extrabold'}}>GPA: {education.gpa}/4.0</Text>
                              </Text>
                              <Text style={{fontSize:'11px',}}>
                                {education.startYear}-{education.endYear}
                              </Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'12px',}}>
                                Thesis: {education.thesisTitle}
                              </Text>
                            </View>
                          </View>
                        ))
                      }    
                    </View>
                  </View>
                }
                {step.type==="w" &&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896'}}>{step.title}</Text> 
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(work => (
                          <View style={[styles.column, {marginBottom:'6px'}]} key={work.title}>
                            <View style={styles.row}>
                              <Text style={{fontSize:'14px', fontWeight:'extrabold', width:'440px'}}>
                                {work.title}
                              </Text>
                              <Text style={{fontSize:'11px',}}>
                                {work.location}
                              </Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'12px', fontWeight:'extrabold', width:'440px'}}>
                                {work.jobTitle}
                              </Text>
                              <Text style={{fontSize:'11px',}}>
                                {work.startYear}-{work.endYear}
                              </Text>
                            </View>
                            <View style={styles.column}>
                              {work.duties.map(duty => (
                                <Text style={{fontSize:'11px',}} key={duty}>
                                  &#8226; {duty}
                                </Text>
                              ))}
                            </View>
                          </View>
                        ))
                      }    
                    </View>
                  </View>
                }
                {step.type==="pstch" &&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896'}}>{step.title}</Text>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                                    
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(pstce => (
                          <View style={styles.column} key={pstce.title}>
                            <View style={styles.row}>
                              <Text style={{fontSize:'14px', fontWeight:'extrabold', width:'440px'}}>
                                &#8226; {pstce.title}
                              </Text>
                              <View style={styles.column}>
                                {pstce.type ?
                                  <Text style={{fontSize:'11px',}}>
                                    {pstce.date}, {pstce.type}
                                  </Text>
                                  :
                                  <Text style={{fontSize:'11px',}}>
                                    {pstce.date}
                                  </Text>
                                }
                              </View>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'12px', marginLeft:'10px'}}>
                                {pstce.description}
                              </Text>
                            </View>
                          </View>
                        ))
                      }    
                    </View>
                  </View>
                }
                {step.type==="s" &&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896'}}>{step.title}</Text>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                                    
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(skill => (
                          <View style={styles.column} key={skill.title}>
                            <View style={styles.row}>
                              <Text style={{fontSize:'14px', fontWeight:'extrabold', width:'440px'}}>
                                &#8226; {skill.title}
                              </Text>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'11px', marginLeft:'10px', marginTop:'2px'}}>
                              {skill.description}
                              </Text>
                            </View>
                            <View style={styles.column}>
                              {
                                skill.libraries.map(lib => (
                                  <Text key={lib} style={{fontSize:'12px', marginLeft:'14px', marginTop:'3px', marginBottom:'2px'}}>
                                    &ndash; {lib}
                                  </Text>
                                ))
                              }
                            </View>
                          </View>
                        ))
                      }    
                    </View>
                  </View>
                }
                {step.type==="l" &&
                  <View style={styles.iah} wrap={false} key={step.id}>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896'}}>{step.title}</Text>
                    <Text style={{fontSize:'18px', width:'440px', color:'#006896', marginTop:'-10px'}}>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</Text>                  
                                    
                    <View style={{flowDirection:'column', marginLeft:'25px', marginTop:'4px'}}>
                      {
                        step.info.map(lang => (
                          <View style={styles.column} key={lang.title}>
                            <View style={styles.row}>
                              <Text style={{fontSize:'14px', fontWeight:'extrabold', width:'440px'}}>
                                &#8226; {lang.title}  <Text style={{fontSize:'11px'}}>{lang.level}</Text>
                              </Text>
                              <View style={styles.column}>
                                <Text style={{fontSize:'11px',}}>
                                  {lang.date}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.row}>
                              <Text style={{fontSize:'11px', marginLeft:'10px', marginTop:'2px'}}>
                              {lang.exam} (score:{lang.score})
                              </Text>
                            </View>
                          </View>
                        ))
                      }    
                    </View>
                  </View>
                }
              </>
            )
          })
          }        
        </View>
      </Page>
    </Document>
  );
  const [openModal, setOpenModal] = useState(false)
  const [opennedStepId, setOpennedStepId] = useState("0")

  const handleUpdateStepLists = (stepId, attribute, value) => {
    setStepsList(steps => {
      return steps.map(step => {
          return step.id===stepId ? {...step, info: { ...step.info, [attribute]: value}} : step
      })
    })
  }

  const [objectToAddToInfo, setObjectToAddToInfo] = useState({})
  const [objDeletionNotif, setObjDeletionNotif] = useState(0)
  const handleAddObjectToStep = () => {
    stepsList.filter(step => step.id===opennedStepId)[0].progress = 100

    if (opennedStepId==="6"){
      const skillsArray = objectToAddToInfo?.libraries.split(";")
      objectToAddToInfo.libraries = skillsArray
    }
    if (opennedStepId==="4"){
      const dutiesArray = objectToAddToInfo?.duties.split(";")
      objectToAddToInfo.duties = dutiesArray
    }

    if (objectToAddToInfo!=null){
      const keys = Object.keys(objectToAddToInfo);
      console.log(keys)
      let hasData = true;

      keys.map(key => {
        if (objectToAddToInfo[key] === null || objectToAddToInfo[key] === undefined) {
          hasData = false;
          return 0
        }
        return 1
      })

      if (hasData) {
        stepsList.filter(step => step.id===opennedStepId)[0].info.push(objectToAddToInfo)
        setObjectToAddToInfo({id:(Math.random() + 1).toString(36).substring(7)})
      } else {
        console.log('The object is not null, but some attributes do not have data.');
      }

    }
  }

  const handleDeleteAnObjectFromStep = (objectId) => {
    stepsList.filter(step => step.id===opennedStepId)[0].info = stepsList.filter(step => step.id===opennedStepId)[0].info.filter(obj => obj.id!==objectId)
    setObjDeletionNotif(1)
  }

  const handleEditAnObjectFromStep = (objectId) => {
    const targetObject = stepsList.filter(step => step.id===opennedStepId)[0].info.filter(obj => obj.id===objectId)[0]
    if (opennedStepId==="6"){
      const skillsArray = targetObject.libraries.join(';')
      targetObject.libraries = skillsArray
    }
    if (opennedStepId==="4"){
      const dutiesArray = targetObject.duties.join(';')
      targetObject.duties = dutiesArray
    }
    setObjectToAddToInfo(targetObject)
    handleDeleteAnObjectFromStep(objectId)
    console.log(targetObject)
  }

  const [saveToCloud, setSaveToCloud] = useState(false)

  const handleSaveAndClose = () => {

    handleAddObjectToStep()
    stepsList.filter(step => step.id===opennedStepId)[0].progress = 100;
    setOpenModal(false)
    localStorage.setItem('resume_cv', JSON.stringify(stepsList))
  }

  const handleSaveCVToCloud = () => {
    setSaveToCloud(true)
  } 

  useEffect(()=>{
    setObjDeletionNotif(0)
  },[stepsList, objDeletionNotif])


  return (
    <>
      <Helmet>
        <title> Kooch | CV Creator </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack style={{touchAction:'none'}} direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Create a Resume (CV)
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          Fill out the steps below and download your academially formatted CV for <strong>free!</strong><br/>
          Don't worry, your progress is automatically saved locally and you can come back later to complete/edit it. Also, you can:  
          <LoadingButton loading={saveToCloud} loadingPosition="start" variant='text' size='small' startIcon={<Iconify icon="ic:outline-cloud-upload"/>} sx={{ml:1}} onClick={handleSaveCVToCloud}>
            Save to Cloud!
          </LoadingButton>
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid container marginTop={"24px"} marginBottom={"12px"} justifyContent={"center"}>
              <DragDropContext onDragEnd={handleDragEndToSortSteps}>
                <Droppable droppableId='stepstocvcreation'>
                  {(provided) => (
                    <Grid item className='stepstocvcreation' {...provided.droppableProps} ref={provided.innerRef}>
                      {
                        stepsList.map((step, index)=>{
                          return(
                            <Draggable key={step.id} draggableId={step.id} index={index}>
                              {(provided)=>(
                                <Paper {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} elevation={4} sx={{mb:1, width:'300px'}} onClick={()=>{setOpenModal(true);setOpennedStepId(step.id);setObjectToAddToInfo({id:(Math.random() + 1).toString(36).substring(7)})}}>
                                  <Grid container justifyContent={'center'} alignItems={'center'}>
                                    <Grid item xs={1} sx={{marginTop:'6px', marginLeft:'6px'}}>
                                      {step.progress===100 ?
                                        <Iconify style={{color:'green'}} width='40px' icon='fluent-mdl2:completed'/>
                                        :
                                        <CircularProgressWithLabel value={step.progress} style={{border:'1px solid gray', borderRadius:'50%', marginLeft:'1px'}} />
                                      }
                                    </Grid>
                                    <Grid item xs={9}>
                                      <Typography variant='body1' textAlign={"center"}>{step.title}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                      <Iconify icon='ic:round-navigate-next'/>
                                    </Grid>
                                  </Grid>
                                </Paper>                        
                              )}
                            </Draggable>
                          )
                        }
                        )
                      }
                    {provided.placeholder}  
                    </Grid>
                  )
                  }
                </Droppable>
              </DragDropContext>
            </Grid>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item>
                <PDFDownloadLink document={<MyDocument />} fileName="Resume(CV)_Kooch!.pdf">
                  {
                    ({ blob, url, loading, error }) =>{
                      return (
                        <LoadingButton variant='contained' loading={loading} startIcon={<Iconify icon="material-symbols:download-for-offline-outline"/>}>
                          Download
                        </LoadingButton>
                      )
                    }
                  }
                </PDFDownloadLink>
              </Grid>
              <Grid item>
                <LoadingButton variant='contained' startIcon={<Iconify icon="material-symbols:settings-outline"/>}>
                  Preferences
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        
          <Grid item xs={0} sm={0} md={8} lg={8} xl={8}>
            {mdUp && openModal===false &&
              <PDFViewer height={'100%'} width={'100%'} style={{borderRadius:'15px'}}>
                <MyDocument/>
              </PDFViewer>
            }
          </Grid>
        </Grid>
      </Container>

      <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={()=>setOpenModal(false)}
            closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={styledModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {stepsList.filter(step=>step.id===opennedStepId)[0]?.title}
            </Typography>
            {opennedStepId==="1" && 
              <>
                <Grid container justifyContent='space-between' spacing={1} sx={{mt:2, maxHeight:'450px', overflow:'auto',}}>
                  <List
                    sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}
                  >
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField value={stepsList.filter(step=>step.id===opennedStepId)[0].info.name} onChange={(e)=>handleUpdateStepLists(opennedStepId, "name", e.target.value)} label="Full Name"/>
                      </FormControl>
                    </ListItem>

                    <ListItem>
                      <FormControl fullWidth>
                        <TextField value={stepsList.filter(step=>step.id===opennedStepId)[0].info.email} onChange={(e)=>handleUpdateStepLists(opennedStepId, "email", e.target.value)} label="Email"/>
                      </FormControl>
                    </ListItem>

                    <ListItem>
                      <FormControl fullWidth>
                        <TextField value={stepsList.filter(step=>step.id===opennedStepId)[0].info.phone} onChange={(e)=>handleUpdateStepLists(opennedStepId, "phone", e.target.value)} label="Phone Number"/>
                      </FormControl>
                    </ListItem>

                    <ListItem>
                      <FormControl fullWidth>
                        <TextField value={stepsList.filter(step=>step.id===opennedStepId)[0].info.linkedIn} onChange={(e)=>handleUpdateStepLists(opennedStepId, "linkedIn", e.target.value)} label="LinkedIn URL"/>
                      </FormControl>
                    </ListItem>

                  </List>
                </Grid>
                <Grid container spacing={2} sx={{mt:1}} justifyContent="space-around">
                    <Grid item>
                      <LoadingButton variant='contained' startIcon={<Iconify icon='mdi:content-save-check'/>} onClick={handleSaveAndClose}>
                        Save & Close
                      </LoadingButton>
                    </Grid>
                </Grid>
              </>
            }
            {opennedStepId!=="1" && opennedStepId!=="0" &&
              <>
                <Grid container justifyContent='space-between' spacing={1} sx={{mt:1, maxHeight:'450px', overflow:'auto',}}>
                  <List
                    sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
                  >
                    {
                      Object.entries(stepsList.filter(step=>step.id===opennedStepId)[0]?.structure)?.map(([key, value]) => {
                        return(
                          <ListItem key={key}>
                            <FormControl fullWidth>
                              <TextField value={objectToAddToInfo?.[key] || ""} onChange={(e)=>{setObjectToAddToInfo(prev=>({...prev, [key]:e.target.value}));}} label={value}/>
                            </FormControl>
                          </ListItem>
                        )
                      })  
                    }

                  </List>
                </Grid>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item>
                      <LoadingButton variant='contained' startIcon={<Iconify icon='mdi:content-save-check'/>} onClick={handleSaveAndClose}>
                        Save & Close
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      <LoadingButton color='warning' variant='contained' startIcon={<Iconify icon='material-symbols:add'/>} onClick={handleAddObjectToStep}>
                        Add
                      </LoadingButton>
                    </Grid>
                </Grid>
                <hr/>
                <Grid container sx={{maxHeight:'120px', overflow:'auto'}}>
                  {
                    stepsList.filter(step=>step.id===opennedStepId)[0]?.info.map(info => {
                      return(
                        <Paper key={info.title}>
                          <Grid container justifyContent={'space-between'}>
                            <Grid item xs={10} style={{width:'310px', maxWidth:'310px',}}>
                              <Typography noWrap variant='body2' style={{width:'230px', maxWidth:'230px', overflow:'hidden', textOverflow:'ellipsis'}}>
                                {info.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Iconify sx={{cursor:'pointer', '&:hover': { opacity: 0.72 }}} onClick={()=>handleEditAnObjectFromStep(info.id)} icon='typcn:edit'/>
                              <Iconify sx={{cursor:'pointer', '&:hover': { opacity: 0.72 }}} onClick={()=>handleDeleteAnObjectFromStep(info.id)} icon='ic:outline-delete'/>
                            </Grid>
                          </Grid>
                        </Paper>
                      )
                    })
                  }
                </Grid>
              </>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
