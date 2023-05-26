import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  Pagination
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import WorkItem from './WorkItem';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import { useStateValue } from '../../context/StateProvider';
import SellerNotificationContainer from '../../components/seller_components/SellerNotificationContainer';


const WorkItemsContainer = (props) => {

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  const [{ workItems,user ,seller,notificationShow}, dispatch] = useStateValue();
  return (
    <div>

      <Box {...props} component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
            Work Items
          </Typography>
          <Box sx={{ m: 1 }}>

            <Link to={"/createItem"}  onClick={scrollToTop}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  ':hover': {
                    bgcolor: 'primary.dark', // theme.palette.primary.dark
                    color: 'white',
                  },
                }}
              >
                New Item <MdAdd />
              </Button>
            </Link>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search Work Item"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >

            {/* {workItems && workItems.length > 0 ? (
              workItems.map((item) => (
                <Grid
                  item
                  key={item.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <WorkItem workitem={item} />
                </Grid>

              ))) : (null)} */}

              {workItems && workItems.length > 0 ? (
              workItems?.filter((n)=>n.userEmail===user.email).map((item) => (
                <Grid
                  item
                  key={item.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <WorkItem workitem={item} />
                </Grid>

              ))) : (null)}

            

          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <span
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Box>

      {seller && notificationShow &&  <SellerNotificationContainer/> }
    </div>
  )
}

export default WorkItemsContainer
