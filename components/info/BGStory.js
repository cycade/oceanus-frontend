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
    <div className='bg-light py-3'>
      <div className='py-5'>
        <p className='h2 text-center'>The background story about Leadbeater's Possum</p>
      </div>
      <div className='row pb-5 container mx-auto'>
        <div className='col-12 col-md-4'>
          <div className='mx-auto border border-dark p-2' style={{'width': '175px'}}>
            <div className='mx-auto' style={headerStyle}></div>  
          </div>        
        </div>
        <div className='col-12 col-md-8'>
          <div className='d-flex justify-content-center align-items-center'>
            <p className='p-auto h5 font-weight-light'>Since its re-discovery in 1961, Leadbeater's Possum has been recorded at approximately 300 localities. However, some of these sites have since been disturbed by fire and logging and all have been subject to successional changes so many may no longer contain suitable habitat. Records since the species' rediscovery indicate that Leadbeater's Possum is mainly confined to montane ash forests, dominated by Eucalyptus Regnans, Eucalyptus Delegatensis or Eucalyptus Nitens, in the Central Highlands of Victoria.</p>
          </div>
        </div>
      </div>
    </div>
  );
}