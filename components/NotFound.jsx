import { Box, Typography, Card, CardContent, CardMedia} from "@mui/material";
// PATRIZIO NOT IMPLEMENTED
const NotFound = () => {

    return (
        <>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
            <Card className="card" >
                <CardMedia
                    component="img"
                    height="50"
                    image="microsoft_azure_logo.svg"
                    alt="Microsoft Azure"
                    style={{marginTop: "10px"}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    404: Not Found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    We couldn`&apos;`t find that page, please check the URL and try again.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        </>
    );
}

export default NotFound;