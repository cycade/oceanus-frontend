import NavigationBar from '../components/NavigationBar.js';
import NewsWrapper from '../components/news/NewsWrapper.js';

export default function news() {
  return (
    <div>
      <NavigationBar currentPage='news' />
      <NewsWrapper />
    </div>
  )
}