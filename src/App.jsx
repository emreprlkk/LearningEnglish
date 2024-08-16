import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import './flipcard.css'


const colorsFront = ['#7fff00', '#6495ed', '#dc143c', 'violet ', '#FF8C33', 'lightpink ']; // Belirli renkler
const colorsBack = ['#fff8dc']; // Belirli renkler

const CardContainer = styled(Card)(({ theme }) => ({
  width: 300,
  height: 200,
  perspective: 1000,
  margin: '1px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',

}));

const FlipCardInner = styled('div')(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlipCardFront = styled('div')(({ color }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: color, // Ön yüz rengi dinamik olarak belirlenir
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  borderRadius: '10px',
  boxSizing: 'border-box'
}));

const FlipCardBack = styled('div')(({ color }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: color, // Arka yüz rengi dinamik olarak belirlenir
  color: 'black',
  transform: 'rotateY(180deg)',
  display: 'flex',
  fontSize:'12px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  borderRadius: '8px',
  padding: '10px',
  boxSizing: 'border-box',
}));


const TextContainer = styled('div')({
  maxHeight: '100%', // Kartın yüksekliğine göre sınırlandır
  overflowY: 'auto', // Uzun metinler için kaydırma işlevi
  width: '100%', // Metnin taşmaması için genişliği sınırlıyoruz
  paddingRight: '20px', // Kaydırma çubuğu ile metin arasında boşluk bırakıyoruz
});

const App = () => {
  const [items, setItems] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serverjs-one.vercel.app/full_data');
        setItems(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div >
      <div className='flipcard'>  
      
       <Grid   container spacing={{ xs: 1, md: 1,l:1,xl:1}} columns={{ xs: 1, sm: 1, md: 1 ,l:1,xl:1}}>
        {currentItems.map((item, index) => (
           <Grid item  key={index}>
            <CardContainer onClick={() => handleFlip(index)}>
              <FlipCardInner isFlipped={flippedIndex === index}>
                <FlipCardFront color={colorsFront[index % colorsFront.length]}>
                  <Typography variant="h4">{item.Kelime}</Typography>
                </FlipCardFront>
                <FlipCardBack color={colorsBack[(index + 1) % colorsBack.length]}>
                <TextContainer>
                  <Typography variant="body1">
                    {item.Anlamı}
                  </Typography>
                  </TextContainer>
                </FlipCardBack>
              </FlipCardInner>
            </CardContainer>
          </Grid>
        ))}
      </Grid>
      <div className='pagination'> 
         {pageNumbers.map(number => (
          <Button
            key={number}
            variant={number === currentPage ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage(number)} >
            {number}
          </Button>
        ))}
      
    </div>
      
      
      </div>
      {/*    <div className='pagination'> 
         {pageNumbers.map(number => (
          <Button
            key={number}
            variant={number === currentPage ? 'contained' : 'outlined'}
            onClick={() => setCurrentPage(number)} >
            {number}
          </Button>
        ))}
      
    </div>*/}
   


      
     
    </div>
  );
};

export default App;
