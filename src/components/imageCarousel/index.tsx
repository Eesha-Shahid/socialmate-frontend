import { Carousel, Image } from "antd"
import { IImageCarouselProps } from "./types"

const ImageCarousel: React.FC<IImageCarouselProps> = ({ media }) => {
  if (media.length === 1) {
    return (
      <div className="single-image-gallery" style={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={media[0]} alt={`Media 1`} style={{ borderRadius: '15px', maxWidth: '100%', height: 'auto' }} />
      </div>
    );
  }

  return (
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
        <div className="image-gallery" key={index} style={{ marginRight: '2rem' }}>
          <Image src={url} alt={`Media ${index + 1}`} style={{ marginRight: '2rem', borderRadius: '15px', maxWidth: '96%', height: 'auto' }} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;