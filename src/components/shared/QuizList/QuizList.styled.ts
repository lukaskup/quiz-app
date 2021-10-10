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

        &:hover {
            box-shadow: ;
        }
    }
`;
