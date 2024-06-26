import { Box, Button, Stack, Text, background } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate()
  const handleNextQuestion = () => {
   navigate("/leaderboard")
  };
  
  const setQuiz = async() => {
    console.log("Fetching quiz data...");
      try {
          const que = JSON.parse(sessionStorage.getItem("user-data"));
          //console.log(que);
          const cat = que.category;
          //console.log(cat)
          //console.log(que.numberOfQuestion);
          const response = await axios.get(`https://proud-ray-clothes.cyclic.app/data?category=${cat}&_limit=${que.numberOfQuestion}`)
          setData(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    console.log(data)
    
    useEffect(() => {     
        setQuiz();
    }, []);
    
    return (
        <Box mt={50} w={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} h={'100vh'} gap={10}>
      {data.map((e, index)=>(
          <Quiz e={e} key={index}/>
      ))}
      <Stack display={'flex'} flexDirection={'row'} mb={15}>
      <Button onClick={handleNextQuestion}>Submit</Button>
      </Stack>
    </Box>
  );
};

export default QuizPage;

const Quiz = (e) => {
    const [bg, setBg] = useState("");
    const [bg1, setBg1] = useState("");
    const [bg2, setBg2] = useState("");
    const [bg3, setBg3] = useState("");
    const [select, setSelect] = useState(0);
    e=e.e
    console.log(e)

  return (
    <Box mb={5} mt={50} w={'100vh'} border={'1px solid black'} bg='#6b5cd5' color={'white'} _groupDisabled={select?true:false}>
        <Stack>
            <Text mb={5}>{e.question}</Text>
            <button onClick={()=>{
                    setSelect(0);
                    setBg('green');
                }} style={{border:'1px solid white',  background:bg}}>
                {e.correct_answer}
            </button>
            <button onClick={()=>{
                    setSelect(0);
                    setBg1('red');
                }} style={{border:'1px solid white', background:bg1}}>
                {e.incorrect_answers[1]}
            </button>
            <button onClick={() =>{
                    setSelect(0);
                    setBg2('red');
                }} style={{border:'1px solid white', background:bg2}}>
                {e.incorrect_answers[0]}
            </button>
            <button onClick={() => {
                    setSelect(0);
                    setBg3('red');
                }} style={{border:'1px solid white', background:bg3}}>
                {e.incorrect_answers[2]}
            </button>
        </Stack>
    </Box>
  );
};