import NavigationBar from '../components/NavigationBar.js';
import RecordChartByMonth from '../components/map/RecordChartByMonth.js';
import ExploreTip from '../components/ExploreTip.js';
import Grid from '@material-ui/core/Grid';

export default function explore() {
    return (
      <div>
        <NavigationBar currentPage='explore' />
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
            <RecordChartByMonth onChooseMonth={() => {}}/>
        </Grid>
        </Grid>
        <ExploreTip />
      </div>
    )
  }

