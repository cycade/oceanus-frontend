export default function getRecordPopup(record) {
  return `${record['count']} LBP(s) occurred on ${record['year']}/${record['month']}/${record['day']} <br /> At lat:${record['latitude']} lng:${record['longitude']}`;
}