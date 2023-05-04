import React from 'react';
import {
    AppBar, Button, Chip,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemText,
    styled, Toolbar, Typography, useTheme
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';

export function RightToolbar() {

    const drawerWidth = 240;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: drawerWidth,
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return(
        <>
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    TheEverythingTracker
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    sx={{ ...(open && { display: 'none' }) }}>

                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}>

            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                Objekte
            </DrawerHeader>

            <List style={{display:"flex", flexFlow:"column"}}>
                <Chip label="Objekt1" onDelete={handleDelete} />
                <Chip label="Objekt2" onDelete={handleDelete} />
                <Chip label="Objekt3" onDelete={handleDelete} />
                <Chip label="Objekt4" onDelete={handleDelete} />
                <Chip label="Objekt5" onDelete={handleDelete} />
                <Chip label="Objekt6" onDelete={handleDelete} />
            </List>
            <Divider/>

            <Button style={{color:"red", border:"solid"}}>
                <DeleteIcon></DeleteIcon>
                <ListItemText primary={"Delete"} />
            </Button>
        </Drawer>
        </>
    );
}