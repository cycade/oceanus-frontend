import Species from "./Species";

const headerStyle = {
  "height": "155px",
  "minHeight": "155px",
  "width": "155px",
  "minWidth": "155px",
  "background": "no-repeat center center scroll",
  "WebkitBackgroundSize": "cover",
  "MozBackgroundSize": "cover",
  "OBackgroundSize": "cover",
  "backgroundSize": "cover",
  "backgroundImage": "url('/static/img/E01.jpg')",
}


export default function BGStory(props) {
  return (
    <div className='py-3' id='bgstory'>
      <div className='py-5'>
        <p className='h2 text-center'>The background story about Leadbeater's Possum</p>
      </div>
      <div className='row container pb-5 mx-auto'>
        <Species />
      </div>
    </div>
  );
}