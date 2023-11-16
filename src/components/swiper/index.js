import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";

export default function MySwiper({
    slides,
    title,
    handleSelected,
}) {
    return (
        <div className="swiper-container">
            <h3>{title}</h3>
            <Swiper

                watchSlidesProgress={true}
                slidesPerView={8}
                spaceBetween={1}
                className="mySwiper"
            >
                {
                    slides && slides.map((slide, i) => {
                        return <SwiperSlide key={slide?.Id} onClick={() => handleSelected(i)}>
                            <img src={require(`../../assets/${slide?.CoverImage}`)} alt="movie poster" />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    );
}