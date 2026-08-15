import { Box, Modal, Paper, Theme, ThemeProvider } from "@mui/material";
import TabContent from "../ui/TabContent";
import EditHeader from "./EditHeader";
import EditTabs from "./EditTabs";

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
                        <EditTabs/>
                    </Paper>
                    <Box
                        sx={{
                            p: 3,
                            flex: 1,
                            overflowY: "auto"
                        }}>
                        {
                            ([]).map((_armor, index) => (
                                <TabContent
                                    key={index}
                                    value={0}
                                    index={0}
                                >
                                    <></>
                                </TabContent>
                            )
                        )}
                    </Box>
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}
