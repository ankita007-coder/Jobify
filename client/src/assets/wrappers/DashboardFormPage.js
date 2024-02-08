import styled from 'styled-components'

const Wrapper = styled.section`

  border-radius: var(--borderRadius);
  background-color:var(--background-color);
  width:100%;
  .dashboard{
    display:grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page{
    width:90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  h3 {
    margin-top: 0;
  }
  .form {
    background-color:var(--backgroundSecondaryColor);
    padding: 20px;
    margin: 10px;
    box-shadow: none;
    max-width: 100%;
    width: 100%;
    color:var(--text-color);
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .form-input{
    color:var(--text-color);
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  .form-select{
    background-color:var(--backgroundSecondaryColor);
    color:var(--text-color);
  }
  @media (min-width: 992px) {
    .dashboard{
      display:grid;
      grid-template-columns: auto 1fr;
    }
    .dashboard-page{
      width:90%;
    }
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Wrapper
