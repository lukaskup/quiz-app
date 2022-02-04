import styled from 'styled-components';

export const NavigationContainer = styled.nav`
    height: 40px;
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: rgba(149, 157, 165, 0.2) 0 2px 24px;

    #lang {
        border: 1px solid black;
        border-radius: 20px;
        padding: 3px;
        width: 80px;
    }

    a {
        color: black;
        text-decoration: none;

        .logo-icon {
            position: absolute;
            left: 40px;
            bottom: 2px;

            svg {
                fill: ${({ theme }) => theme.accent};
            }
        }

        span {
            display: block;
            font-size: 36px;
            font-weight: 800;
            transform: translateY(-7px);
            padding-left: 50px;
        }
    }

    .navi-links {
        position: absolute;
        right: 40px;
        top: 10px;
        width: fit-content;

        a {
            padding: 5px 15px;
            text-transform: uppercase;
            font-weight: 600;
        }

        @media only screen and (max-width: 768px) {
            display: none;
        }

        .hamburger-icon {
            position: absolute;
            right: 40px;
            top: 10px;
        }

        .userProfile {
            display: inline-block;

            .avatar {
                display: inline-block;
                background: #6db183;
                padding: 6px;
                border-radius: 20px;
                height: 20px;
                width: 20px;
                text-align: center;
                color: white;
                font-size: 15px;
                position: absolute;
                right: 0;
                top: -5px;
            }

            .logout {
                display: inline-block;
                cursor: pointer;
                margin-left: 20px;
                margin-right: 40px;
            }
        }
    }

    .mobile-menu {
        @media only screen and (min-width: 768px) {
            display: none;
        }
        position: absolute;
        right: 40px;
        top: -6px;
    }

    .mobile-drawer {
        display: none;
        position: absolute;
        height: 100vh;
        width: 100%;
        background: white;
        z-index: 100;
        top: 56px;
        left: 0;

        &.open {
            display: block !important;
        }

        a {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            margin-top: 40px;
            text-align: center;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
`;
