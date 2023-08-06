import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Chair} from "@mui/icons-material";

interface TrackedObjectListItemProps {
    name: string;
    deleteHandler: () => void;

}

export const TrackedObjectListItem = ({name, deleteHandler}: TrackedObjectListItemProps) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteHandler}>
                    <DeleteIcon/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <Chair/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={false && "Tracker Implementation"} // todo: Zu jedem Objekt dazuschreiben, welcher Tracker?
            />
        </ListItem>
    );
};
