import TourismCarousel from '../Components/TorisemCoursel';
import DestinationComponents from '../Components/DestinationComponent';
import FooterComponent from '../Components/FooterComponent';
function Home() {
  return (
    <>
        
        <div className="bg-[#0b1020] min-h-screen p-6">
            <TourismCarousel />
        </div>
        <DestinationComponents />
        <FooterComponent />

    </>
  )
}

export default Home
