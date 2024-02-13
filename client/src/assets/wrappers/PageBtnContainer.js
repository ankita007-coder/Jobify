import styled from 'styled-components';

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  .pagebtn-container {
    background: transparent;
    display: flex;
    margin: 0;
  }
  .page-btn {
    background: var(--backgroundSecondaryColor);
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: 0px;
    cursor:pointer;
  }
  .active{
    background:var(--primary-500);
    color: var(--white);
  }
  .prev-btn,.next-btn{
    background: var(--backgroundSecondaryColor);
    border-color: transparent;
    border-radius: var(--borderRadius);
    width: 100px;
    height: 40px;
    color: var(--primary-500);
    text-transform:capitalize;
    letter-spacing:var(--letterSpacing);
    display:flex;
    align-items:center;
    justify-content:center;
    gap:0.5rem;
    cursor:pointer;
  }
  .prev-btn:hover,.next-btn:hover{
    background:var(--primary-500);
        color: var(--white);
        transition:var(--transition);
  }
  .dots{
    display:grid;
    place-items:center;
    cursor:text;
  }
`;
export default Wrapper;