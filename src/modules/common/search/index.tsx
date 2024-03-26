import {
  Calculate,
  CalendarToday,
  CreditCard,
  EmojiEmotions,
  Person,
  Settings,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { BasicModal as Modal } from "../modal";
import { useState } from "react";

export function Search() {
  const [OpenModal, setModalOpen] = useState(false);

  function toggleSearchModal() {
    setModalOpen((oldState) => !oldState);
  }
  return (
    <Modal
      width={600}
      open={OpenModal}
      padding={0}
      CloseModal={toggleSearchModal}
      borderRadius={3}
      backdropBackgroundColor="#EFEFE"
    >
      <div className="rounded-lg border shadow-md p-4">
        <TextField
          placeholder="Type a command or search..."
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
            ),
          }}
        />
        <List>
          <Typography variant="body2" color="textSecondary" className="mt-2">
            Suggestions
          </Typography>
          <ListItem button>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EmojiEmotions />
            </ListItemIcon>
            <ListItemText primary="Search Emoji" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Calculate />
            </ListItemIcon>
            <ListItemText primary="Calculator" />
          </ListItem>
          <Divider />
          <Typography variant="body2" color="textSecondary">
            Settings
          </Typography>
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            <Typography variant="body2" color="textSecondary">
              ⌘P
            </Typography>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary="Billing" />
            <Typography variant="body2" color="textSecondary">
              ⌘B
            </Typography>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            <Typography variant="body2" color="textSecondary">
              ⌘S
            </Typography>
          </ListItem>
        </List>
      </div>
    </Modal>
  );
}
