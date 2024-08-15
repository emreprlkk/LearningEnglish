import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CardContainer = styled(Card)(({ theme }) => ({
  height: 300, // Kartın yüksekliğini artırdık
  perspective: 1000,
}));

const FlipCardInner = styled('div')(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlipCardFront = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: '#1a237e',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  textAlign:'center'

});

const FlipCardBack = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  backgroundColor: '#fffaf0',
  color: 'black',
  transform: 'rotateY(180deg)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign:'center',
  borderRadius: '8px',
  padding: '10px',
  boxSizing: 'border-box',

});

const TextContainer = styled('div')({
  maxHeight: '100%', // Kartın yüksekliğine göre sınırlandır
  overflowY: 'auto', // Uzun metinler için kaydırma işlevi
  width: '100%', // Metnin taşmaması için genişliği sınırlıyoruz
  paddingRight: '10px', // Kaydırma çubuğu ile metin arasında boşluk bırakıyoruz
});

const App = () => {
  const [items, setItems] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        setItems(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <Grid container spacing={2} padding={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
          <CardContainer onClick={() => handleFlip(index)}>
            <FlipCardInner isFlipped={flippedIndex === index}>
              <FlipCardFront>
                <Typography variant="h5">{item.Kelime}</Typography>
              </FlipCardFront>
              <FlipCardBack>
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
  );
};

export default App;
