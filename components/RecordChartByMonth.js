import { HorizontalBar } from 'react-chartjs-2';

const data = {
  labels: [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  datasets: [
    {
      label: `Leadbeater\'s Possum Occurrence Record`,
      backgroundColor: `rgba(255, 99, 132, 0.4)`,
      borderWidth: 2,
      hoverBackgroundColor: `rgba(255, 99, 132, 1)`,
      data: [63, 54, 80, 80, 61, 27, 19, 41, 62, 107, 47, 5]
    }
  ]
};

export default function(props) {
  return <HorizontalBar data={data} height={300} />;
}