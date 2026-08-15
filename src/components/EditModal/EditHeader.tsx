import { Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function EditHeader({closeModal}: {closeModal: () => void}){
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                px: 3,
                height: 64
            }}
        >
            <Box>被ダメージ処理 パネル設定</Box>
            <Box>
                <IconButton
                    color="primary"
                    onClick={closeModal}
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}
