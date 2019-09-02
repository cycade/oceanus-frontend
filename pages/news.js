import Head from "next/head";
import NavigationBar from '../source/NavigationBar.js';
import NewsCollection from '../source/NewsCollection.js';

export default function news() {
  return (
    <div>
      <NavigationBar />
      <NewsCollection />
    </div>
  )
}