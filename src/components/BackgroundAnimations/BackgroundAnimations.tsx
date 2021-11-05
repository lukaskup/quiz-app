import React from 'react';
import { BackgroundContainer } from './BackgroundAnimations.styled';
import Circle from './../../assets/imgs/circle.svg';
import Square from './../../assets/imgs/square.svg';
import X from './../../assets/imgs/x.svg';
import { ReactSVG } from 'react-svg';

export const BackgroundAnimations = () => {
    return (
        <BackgroundContainer>
            <ReactSVG src={Circle} />
            <ReactSVG src={Square} />
            <ReactSVG src={X} />

            <ReactSVG src={Circle} />
            <ReactSVG src={Square} />
            <ReactSVG src={X} />

            <ReactSVG src={Circle} />
            <ReactSVG src={Square} />
            <ReactSVG src={X} />
        </BackgroundContainer>
    );
};
