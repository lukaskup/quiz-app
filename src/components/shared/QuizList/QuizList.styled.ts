import styled from 'styled-components';
import { Container } from '../../../App.styled';

export const QuizListContainer = styled(Container)`
    margin-top: 50px;
    .quiz-element {
        border: 1px solid black;
        border-radius: 30px;
        padding: 20px;
        font-weight: 600;
        margin-top: 10px;
        transition: 0.2s;
        cursor: pointer;
        position: relative;

        &:hover {
            box-shadow: 0 2px 13px -1px rgba(135, 135, 135, 1);
        }

        .play-icon {
            position: absolute;
            right: 9px;
            top: 7px;
        }
    }
`;
