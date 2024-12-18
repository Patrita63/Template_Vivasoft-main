import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box, Typography, Card, CardContent, CardMedia} from "@mui/material";

const Home = () => {
  // To navigate to another page
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page it-IT
    // router.push("/it-IT");

    // Under Construction
  })

  return (
    <>
    {/* <div style={{ backgroundImage: 'undercostruction.jpeg'}}> */}
    <div 
      style={{
        backgroundImage: `url('./undercostruction.jpeg')`,
        // backgroundSize: 'cover', // Ensures the image covers the div
        // backgroundPosition: 'center', // Centers the image
        height: '800px', // Set height for the container
        // width: '100%', // Optional, set width
      }}
    >
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
          
            bgcolor: 'gold',
          
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
        <Card className="card" >
            <CardMedia
                component="img"
                height="100"
                image="merrychristmas.jpg"
                alt="Microsoft Azure"
                style={{marginTop: "10px"}}
            />
            <CardContent>
                <Typography gutterBottom variant="h2" color="red" textAlign={'center'} component="div">
                Happy new Y E A R
                </Typography>
                <Typography variant="h6" color="navy" textAlign={'center'}>
                from <strong> Vivasoft</strong>&apos;s team.
                </Typography>
            </CardContent>
        </Card>
      </Box>
    </div>
    </>
  );
};

export default Home;
