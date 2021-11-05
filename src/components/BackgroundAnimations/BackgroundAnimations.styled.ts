import styled from 'styled-components';

export const BackgroundContainer = styled.div`
    div {
        position: absolute;
        z-index: 1;

        &:nth-child(1) {
            top: 200px;
        }
        div {
            svg {
                circle,
                polygon {
                    fill: ${({ theme }) => theme.accent}21;
                }

                circle {
                    &:nth-child(2) {
                        fill: white;
                    }
                }
            }
        }
    }
`;
