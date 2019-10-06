import Grid from '@material-ui/core/Grid';

import NavigationBar from '../components/NavigationBar.js';
import RecordChartByMonth from '../components/map/RecordChartByMonth.js';
import ExploreTip from '../components/explore/ExploreTip.js';
import EucalyptusInfo from '../components/explore/EucalyptusInfo.js';

export default function explore() {
    return (
      <div>
        <NavigationBar currentPage='explore' />
        <RecordChartByMonth onChooseMonth={() => {}}/>
        <EucalyptusInfo />
        <ExploreTip />
      </div>
    )
  }

