import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography} from '@mui/material';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppDonutCharts,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';



import koochUpcomingFeaturesData from '../_mock/koochUpcomingFeaturesData';


// ----------------------------------------------------------------------

export default function KoochStats() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> About | KOOCH </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Let's make the immigration process easier and cheaper!
        </Typography>


        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits by Role"
              subheader="(+103%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'Guests',
                  type: 'area',
                  fill: 'gradient',
                  data: [1210, 3300 , 4200, 5020, 6343, 7200, 7700, 6390, 5020, 4899, 4978],
                },
                {
                  name: 'Internal Users',
                  type: 'area',
                  fill: 'gradient',
                  data: [121, 430 , 820, 1020, 2343, 2200, 3700, 4390, 5020, 5899, 5978],
                },
                {
                  name: 'Abroad Users',
                  type: 'area',
                  fill: 'gradient',
                  data: [51, 72 , 120, 102, 234, 220, 370, 780, 1020, 1299, 1978],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppDonutCharts
              title="Current Visits by Continent"
              chartData={[
                { label: 'America', value: 503},
                { label: 'Asia', value: 5978 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 133 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Trend"
              chartLabels={[ 'Decision', 'CV (Resume)', 'TOEFL/IELTS', 'Admission', 'VISA', 'Ticket/House']}
              chartData={[
                {name: 'Internal Users', data: [300, 1700, 1100, 700, 250, 180] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Kooch Upcoming Features"
              list={koochUpcomingFeaturesData}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
