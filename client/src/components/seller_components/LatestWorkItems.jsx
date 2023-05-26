import React, { useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { formatDistanceToNow, subHours } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useStateValue } from '../../context/StateProvider';

const LatestWorkItems = (props) => {
  const [{ workItems, user }, dispatch] = useStateValue();

  let itemsLength = 0;
  let j = 0;
  useEffect(() => {
    {
      workItems?.filter((n) => n.userEmail === user.email).forEach((item) => (
        itemsLength++
      ))
    }

  }, []);

  return (
    <div>
      <Card {...props}>
        <CardHeader

          title="Latest Work Items"
        />
       
        <Divider />
        <List>
          {workItems?.filter((n) => n.userEmail === user.email).map((workItem, i) => (
            <ListItem
              
              key={workItem.id}
            >
              <ListItemAvatar>
                <img
                  alt="work item image"
                  src={workItem.imageURL}
                  style={{
                    height: 48,
                    width: 48
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={workItem.title}
              //secondary={`Updated ${formatDistanceToNow(workItem.updatedAt)}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <AiOutlineArrowRight />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<IoIosArrowDown />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
    </div>
  )
}

export default LatestWorkItems
