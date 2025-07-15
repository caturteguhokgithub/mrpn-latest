import { DialogActions, Button } from "@mui/material";
import DialogComponent from "../dialog";

export default function DialogDelete({
  handleDelete,
  handleOpenModal,
  handleCloseModal,
  question,
  title,
}: {
  handleDelete?: () => void;
  handleCloseModal?: () => void;
  handleOpenModal: boolean;
  question?: React.ReactNode;
  title?: string;
}) {
  const dialogActionFooterDelete = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleCloseModal}>Batal</Button>
      <Button
        color="error"
        variant="contained"
        onClick={handleDelete}
        sx={{
          color: "white !important",
        }}
      >
        Hapus
      </Button>
    </DialogActions>
  );

  return (
    <DialogComponent
      width={360}
      maxwidth={360}
      dialogOpen={handleOpenModal}
      dialogClose={handleCloseModal}
      title={title}
      dialogFooter={dialogActionFooterDelete}
    >
      {question ? question : "Anda yakin akan menghapus data ini?"}
    </DialogComponent>
  );
}
