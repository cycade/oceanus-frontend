import Grid from '@material-ui/core/Grid';

import NavigationBar from '../components/NavigationBar.js';
import RecordChartByMonth from '../components/map/RecordChartByMonth.js';
import ExploreTip from '../components/explore/ExploreTip.js';
import EucalyptusInfo from '../components/explore/EucalyptusInfo.js';

export default function explore() {
    return (
      <div>
        <NavigationBar currentPage='explore' />
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <RecordChartByMonth onChooseMonth={() => {}}/>
          </Grid>
        </Grid>
        <EucalyptusInfo />
        <ExploreTip />
      </div>
    )
  }

