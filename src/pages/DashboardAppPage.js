import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Divider, Card } from '@mui/material';

import { useEffect, useState } from 'react';

// Data
import tools from '../_mock/tools';

// components
import Iconify from '../components/iconify';

// sections
import { AppToolsCard } from '../sections/@dashboard/app';
import { getToolsInfo } from '../api/actions/tools';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  
  const user = JSON.parse(localStorage.getItem('profile'))

  const [dataLoaded, setDataLoaded] = useState(false)
  const [toolsInfo, setToolsInfo] = useState([])

  const handleToolsInfo = async () => {
    const data = await getToolsInfo()
    setToolsInfo(data)
    setDataLoaded(true)
  }

  useEffect(()=>{
    handleToolsInfo()
  },[toolsInfo.length])

  return (
    <>
      <Helmet>
        <title> Dashboard | KOOCH </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ mb: 5 }}>
          Hi, Welcome to Kooch..!
        </Typography>


        <Grid container spacing={3} justifyContent='space-around' sx={{mb:10, mt:5}}>
          <Grid item xs={12} md={4}>
              <Typography variant='h4'>
                You don't know where to start? You need a roadmap? 🤔 
              </Typography>
              <br/>
              <Typography variant='body'>
                Use the Step-by-Step Auto Guide tool! <br/> First, it makes a roadmap for the entire process. Then, for each stage, it tells you what are the tasks and what you should do exactly. After all, it is 100% FREE!
              </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                py: 3,
                boxShadow: 10,
                textAlign: 'center',
                color: (theme) => theme.palette.primary.dark,
                bgcolor: (theme) => theme.palette.warning.light,
              }}
              
            >
              <Grid container>

                <Grid ml={'10px'} mr={'12px'} xs={1} item justifyContent='center'>
                  <Grid item>
                    <Iconify icon={'icon-park-outline:like'} width={24} height={24}/> <br/>
                    {toolsInfo?.tools?.length > 0 ?
                      <Typography variant='subtitile2'>{toolsInfo.tools[0].numberOfLikes}</Typography>
                      :
                      <Typography variant='subtitile2'>0</Typography>
                    }
                  </Grid>
                  <Grid item mt={2}>
                    <Iconify icon={'uil:comments-alt'} width={24} height={24}/> <br/>
                    {toolsInfo?.tools?.length > 0 ?
                      <Typography variant='subtitile2'>{toolsInfo.tools[0].numberOfComments}</Typography>
                      :
                      <Typography variant='subtitile2'>0</Typography>
                    }
                  </Grid> 
                  <Grid item mt={2}>
                    <Iconify icon={'ic:round-bookmark-border'} width={24} height={24} /> <br/>
                    <Typography variant='body2'>Save</Typography>
                  </Grid> 
                </Grid>

                <Grid item>
                  <Divider orientation='vertical'/>
                </Grid>
                <Grid item xs={10}>
                  <Iconify icon={'mdi:robot-love-outline'} width={48} height={48} />
                  <Typography variant="h4">{'Auto Step-by-Step Guide'}</Typography>

                  <Typography variant="body2" sx={{ opacity: 0.84 }} style={{marginBottom:'25px'}}>
                    {'It makes you a roadmap and creates a timeline schedule for your immigration process.'}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          
        </Grid>


        <Divider sx={{ my: 3 }}>
          <Iconify icon={'mdi:robot-love-outline'} width={28} height={28} />
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            AI-Powered Tools
          </Typography>
        </Divider>


        <Grid container spacing={3}>

          {tools.map((tool) => (
            tool.poweredBy==='KoochAI'&& tool.id!==0 &&
              <Grid key={tool.id} item xs={12} sm={6} md={4}>
                <AppToolsCard link={tool.link} id={tool.id} title={tool.title} description={tool.description} icon={tool.icon} color={tool.color} isLiked={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].likes.filter((id)=> user?(id===user.result._id):false).length > 0 : false} numberOfLikes={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfLikes : 0} numberOfComments={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfComments : 0}/>
              </Grid>
            ))
          }
          
        </Grid>

        <Divider sx={{ my: 3 }} style={{marginTop:'50px'}}>
          <Iconify icon={'fluent:people-community-16-regular'} width={28} height={28} />
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Community Tools
          </Typography>
        </Divider>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} style={{marginBottom:'25px'}}>
            * Some volunteers may provide you with free helps such as paying application fees, TOEFL/IELTS signup fees, security deposit for your house, etc.
        </Typography>


        <Grid container spacing={3}>

          {tools.map((tool) => (
            tool.poweredBy==='KoochCommunity'&&
              <Grid key={tool.id} item xs={12} sm={6} md={4}>
                <AppToolsCard id={tool.id} title={tool.title} description={tool.description} icon={tool.icon} color={tool.color} isLiked={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].likes.filter((id)=>user?(id===user.result._id):false).length > 0 : false} numberOfLikes={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfLikes : 0} numberOfComments={toolsInfo?.tools?.length > 0 ? toolsInfo.tools[tool.index].numberOfComments : 0}/>
              </Grid>
            ))
          }
          
        </Grid>

      </Container>
    </>
  );
}
