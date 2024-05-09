import { Carousel, Image } from "antd"
import { IImageCarouselProps } from "./types"

const ImageCarousel: React.FC<IImageCarouselProps> = ({ media }) => {
  return(
    <Carousel 
        autoplay 
        autoplaySpeed={5000}
        dots 
        slidesToShow={1}
        slidesToScroll={1} 
        infinite 
        centerMode
        centerPadding="100px"
        className="custom-carousel"
    >
        {media.map((url: string, index: number) => (
        <div key={index} style={{ marginRight: '2rem' }}>
          <Image src={url} alt={`Media ${index + 1}`} style={{ marginRight: '2rem', borderRadius: '15px', maxWidth: '100%', height: 'auto' }} />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageCarousel