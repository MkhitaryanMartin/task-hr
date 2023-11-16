import React from 'react';
import { duration } from '../../custom/duration';
import Button from '../../components/button';

const InfoBlock = ({
data
}) => {
    return (
        <div className='info-block'>
                            <h3>{data.Category}</h3>
                            <img src={require("../../assets/FeaturedTitleImage.png")} alt='title' />
                            <p>
                                <span>{data.ReleaseYear}</span>
                                <span>{data.MpaRating}</span>
                                <span>{duration(data.Duration)}</span>
                            </p>
                            <p>{data.Description}</p>
                            <div className='button-block'>
                                <Button mode='white-button'>Play</Button>
                                <Button>More Info</Button>
                            </div>
                        </div>
    );
};

export default InfoBlock;