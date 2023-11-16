import React, { useState, useEffect } from 'react';
import "./style.scss";
import axios from 'axios';
import MySwiper from '../../components/swiper';
import Menu from '../../components/menu';
import { icons } from '../../assets/icons';
import VideoPlear from '../../components/videoPlear';
import InfoBlock from './infoBlock';
import Spinner from "../../components/spinner";


const Home = () => {
    const [data, setData] = useState();
    const [selected, setSelected] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("")
    const [pllay, setPlay]= useState(false)

    const handleVisible = (visible) => {
        setIsVisible(visible);
    };

    const handleSelected = (i) => {
        setPlay(true)
        const first = data?.TendingNow[0];
        const letter = data?.TendingNow[i];
        setSelected(letter);
        const newData = {
            ...data,
            TendingNow: data?.TendingNow.map((el, index) => {
                if (index === 0) return letter;
                if (index === i) return first;
                return el;
            }),
            Featured: data?.TendingNow[i]
        }
        localStorage.setItem("data", JSON.stringify(newData))
        setData(newData);

    };

    useEffect(() => {
       if(localStorage.data){
       const localData = JSON.parse(localStorage.getItem("data"))
        setData(localData)
       }else{
        axios.get("./data.json")
        .then((res) => {
            setLoader(true)
            setData({ ...res.data, TendingNow: res.data?.TendingNow.sort((a, b) => new Date(a.Date) - new Date(b.Date)) });
        })
        .catch((err) => setError("Failed to fetch data"))
        .finally(()=> setLoader(false))
       }
    }, []);

    useEffect(() => {
        if (data?.Featured) {
            setSelected(data.Featured);
        }
    }, [data?.Featured]);

    const isVideoSelected = pllay;
    const imgPath = isVideoSelected ? {} : selected?.CoverImage ? require(`../../assets/${selected.CoverImage}`) : require("../../assets/FeaturedCoverImage.png");

    return (
        <>
        {error ? <div className='error'>{error}</div> : (
            <div className='home-container' style={isVideoSelected ? {} : { backgroundImage: `url(${imgPath})` }}>
                <VideoPlear videoUrl={selected?.VideoUrl} id={selected?.Id} pllay={pllay}>
                    <div className='selected-movie-block'>
                        <Menu items={icons} handleVisible={handleVisible} isVisible={isVisible} />
                        {selected && <InfoBlock data={selected || data?.Featured} />}
                        <MySwiper slides={data?.TendingNow} title="Trending Now" handleSelected={handleSelected} />
                    </div>
                </VideoPlear>
            </div>
        )}
        {loader && <Spinner />}
    </>
        
    );
};

export default Home;


