import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import axios from "axios"
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background: center / cover no-repeat url("../../media/examples/firefox-logo.svg"),
            #eee 100% url("https://cdn.pixabay.com/photo/2016/07/05/16/53/leaves-1498985__340.jpg");
filter: blur(1);
flex-wrap: wrap;
`;
const AdviceDiv = styled.div`
height: 45px;
display: flex;
align-items: center;
justify-content: center;
padding: 0.5rem;
width: 525px;
height: 150px;
}
`;
const Loader = styled.div`
border-top: 2px solid white;
border-bottom: 2px solid white;
border-left: 2px solid white;
border-radius: 50%;
height: 20px;
width: 20px;
position: absolute;
left: 10px;
bottom: 10px;

animation: rotate 1s infinite forwards;
@keyframes rotate{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
`;
const Button = styled.button`
height: 40px;
width: 150px;
border: none;
outline: none;
border-radius: 4px;
font-weight: bold;
font-family: monospace;
font-size: 18px;
cursor: pointer;
box-shadow: 12px 2px 10px 0px black;
transition: all 0.5s;
&:hover{
  transform: scale(0.9);
}
`;
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 2rem;
backdrop-filter: blur(7px);
background: #0e654399;
border-radius: 10px;
gap: 15px;
box-shadow: 30px 15px 40px 0px black;
`;
const H2 = styled.h2`
font-size: 25px;
color: white;
font-weight: bold;
font-family:monospace;
text-align: center;
`;

function App() {
  useEffect(() => {
    fetchAdvice();
  }, [])
  const [newAdvice, setNewAdvice] = useState('')
  const [loading, setLoading] = useState(false)
  const fetchAdvice = async () => {
    setLoading(true)
    await axios.get('https://api.adviceslip.com/advice').then((response) => {
      const { advice } = response.data.slip
      setLoading(false)
      setNewAdvice(advice);
    }).catch(err => console.log(err));
  }
  return (
    <Container className="App">
      <Wrapper>
        <AdviceDiv>
          <H2>{newAdvice}</H2>
        </AdviceDiv>
        {loading && <Loader></Loader>}
        <Button onClick={fetchAdvice}>Change</Button>
      </Wrapper>
    </Container>
  );
}

export default App;
