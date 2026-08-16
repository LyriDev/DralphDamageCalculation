import { Box, Button, Modal, Paper, Theme, ThemeProvider } from "@mui/material";
import EditHeader from "./EditHeader";
import { useContext } from "react";
import { DataContext } from "../../DataProvider";
import EditTab from "./EditTab";

type Props = {
    theme: Theme;
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const {
        theme,
        isOpen,
        closeModal
    } = props;

    const {
        tabs, setTabs,
        addTab
    } = useContext(DataContext);

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4
            }}
        >
            <ThemeProvider theme={theme}>
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 1,
                        width: 600,
                        height: "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Paper elevation={4} sx={{ backgroundColor: "#212121" }}>
                        <EditHeader closeModal={closeModal}/>
                    </Paper>
                    <Box
                        sx={{
                            p: 3,
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}>
                            <Box>
                                <Button onClick={addTab}>追加</Button>
                            </Box>
                        {
                            (tabs).map((_tab, index) => (
                                <EditTab key={index} index={index}/>
                            )
                        )}
                    </Box>
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}
