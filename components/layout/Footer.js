export default function Footer(props) {
  return (
    <div className='bg-dark' style={{'height': '25vh'}}>
        <div className="d-flex justify-content-center mt-3 pt-5">
            <h3 className='text-light'>Built by OceanWorld</h3>
        </div>
        <div className="d-flex justify-content-center pt-3 pb-5">
            <a href='https://mahara.infotech.monash.edu.au/mahara/view/blocks.php?id=35669'>
              <p className='text-light'>View Our Mahara Page</p>
            </a>
        </div>
    </div>
  );
}