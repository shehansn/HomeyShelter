import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import { useStateValue } from '../../context/StateProvider';



const WorkItem = ({ workitem }) => {

  var [price, setTotalPrice] = useState("");

  useEffect(() => {
    
    let total = 0;
    workitem.works?.forEach((row) => {
      total += Number(row.value3); // Convert value3 to a number and add to total
    });
  
    setTotalPrice(total);

  }, []);



  return (
    <div>

      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
            }}
          >

            <img
              src={`${workitem.imageURL}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${workitem.imageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="work item image"
              loading="lazy"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {workitem.title}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="body1"
          >
            {workitem.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <ClockIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                Updated {workitem.createdTime}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <span text="primary" >LKR</span>
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
               {price} 
                {' '}
                Price
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>



    </div>
  )
}

export default WorkItem
