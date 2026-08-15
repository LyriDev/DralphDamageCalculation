import { Box, IconButton, Tab, Tabs } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function EditTabs(){
    return (
        <Box
            className="draggable-disable"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
        >
            <IconButton
                color="primary"
                // disabled={editTabIndex === 0}
                // onClick={() => {
                //     if(editTabIndex > 0) setEditTabIndex(prev => prev - 1);
                // }}
            >
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <Tabs
                style={{flexGrow: 1}}
                value={0}
                onChange={(_, newValue) => (newValue)}
            >
                {([]).map((_, index) => (
                    <Tab
                        key={index}
                        label={_}
                    />
                ))}
            </Tabs>
            <IconButton
                color="primary"
                // disabled={editTabIndex === (data.powerArmors || []).length}
                // onClick={() => {
                //     if(editTabIndex < (data.powerArmors || []).length) setEditTabIndex(prev => prev + 1);
                // }}
            >
                <KeyboardArrowRightIcon/>
            </IconButton>
        </Box>
    )
}
