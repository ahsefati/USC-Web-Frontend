import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

// @mui
import { Container, Link, Typography, Grid } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';


import { AppToolsCard } from '../sections/@dashboard/app';


// components
import Iconify from '../components/iconify';

import tools from '../_mock/tools';
import { getToolsInfo } from '../api/actions/tools';

// ----------------------------------------------------------------------

export default function SavedTools() {

  const user = JSON.parse(localStorage.getItem('profile'))
  const [savedTools, setSavedTools] = useState([])

  const [toolsInfo, setToolsInfo] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  
  const handleToolsInfo = async () => {
    const data = await getToolsInfo()
    setToolsInfo(data)
    setDataLoaded(true)
    if (user){
      const savedTools1 = tools.filter((tool)=> user.result.savedTools.includes(tool.id))
      setSavedTools(savedTools1)
    }
  }

  useEffect(()=>{
    handleToolsInfo()
  },[])

  

  return (
    <>
      <Helmet>
        <title> Saved Tools | Kooch </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Saved Tools
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 5 }}> 
          For easy access, your favourite tools will appear here if you use them a lot or you simply save them. 
        </Typography>

        { savedTools.length===0 ? 
            
            <Typography variant='h6' align='left'>
              There is no saved tools to show here. <br/><br/>
              <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
                <Iconify icon={'carbon:next-outline'} width={36} height={36}/> <br/> Go to Tools
              </Link>
            </Typography>

          :
            <Grid container spacing={3} alignItems={'center'}>
              {savedTools.map((tool) => (
                  <Grid key={tool.id} item xs={12} sm={6} md={4}>
                    <AppToolsCard link={tool.link} id={tool.id} title={tool.title} description={tool.description} icon={tool.icon} color={tool.color} isLiked={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].likes.filter((id)=> user?(id===user.result._id):false).length > 0 : false} numberOfLikes={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfLikes : 0} numberOfComments={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfComments : 0}/>
                  </Grid>
                ))
              }
              
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='h6' align='left'>
                  <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
                    <Iconify icon={'carbon:next-outline'} width={36} height={36}/> <br/> Go to Tools and save more
                  </Link>
                </Typography>
              </Grid>
              
            </Grid>
        }
        
      </Container>
    </>
  );
}
