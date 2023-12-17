import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 275;
const LEGEND_HEIGHT = 36;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppBarCharts.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppBarCharts({ title, subheader, config, ...other }) {
  const theme = useTheme();

  return (
    <Card {...other} sx={{border:'0px'}}>
      <CardHeader title={title} subheader={subheader} />
      <StyledChartWrapper dir="ltr">
        <ReactApexChart options={config.options} series={config.series} type="bar" height={280} /> 
      </StyledChartWrapper>
    </Card>
  );
}
