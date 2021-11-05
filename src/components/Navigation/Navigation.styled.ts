import styled from 'styled-components';

export const NavigationContainer = styled.nav`
    height: 40px;
    padding: 15px;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: rgba(149, 157, 165, 0.2) 0 2px 24px;

    a {
        color: black;
        text-decoration: none;

        .logo-icon {
            position: absolute;
            left: 0;
            bottom: 2px;

            svg {
                fill: ${({ theme }) => theme.accent};
            }
        }

        title {
            display: block;
            font-size: 36px;
            font-weight: 800;
            transform: translateY(-7px);
            padding-left: 50px;
        }
    }
`;
