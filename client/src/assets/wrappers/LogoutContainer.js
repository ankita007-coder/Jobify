import styled from "styled-components";


const Wrapper = styled.div`
    position: relative;
    .logout-btn{
        display:flex;
        align-items: center;
        justify-content: center;
        gap: 0 0.5rem;
    }
    .img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
    .dropdown{
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        box-shadow: var(--shadow-2);
        text-align:center;
        visibilty: hidden;
        border-radius: var(--border-radius);
        background: var(--primary-500);
    }
    .btn-dropdown{
        visibility:visible;
    }
    .dropdown-btn{
        border-radius: var(--border-radius);
        padding: 0.5rem;
        background: transparent;
        border-color: transparent;
        color: var(--white);
        letter-spacwing: var(--letter-spacing);
        text-transform:  capitalize;
        cursor: pointer;
        width: 100%;
        height:100%;
    }
`

export default Wrapper;