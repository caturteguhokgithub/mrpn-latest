import React from "react";
import {
  Button,
  DialogActions,
  FormControl,
  Grid,
  Grow,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { logoOrange, logoBrown, logoGreen, logoBlue, red } from "@/utils/color";
import { BlockCard, CardValue } from "../partials/card";
import SelectCustomTheme from "@/app/components/select";
import { listKldBadanUsaha } from "@/app/utils/data";
import DialogComponent from "@/app/components/dialog";

export default function CardGroup({ darkMode }: { darkMode?: boolean }) {
  const [valueSelect, setValueSelect] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValueSelect(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        onClick={handleModalClose}
      >
        Pilih
      </Button>
    </DialogActions>
  );

  return (
    <>
      <BlockCard darkMode={darkMode}>
        <Grid container spacing={2}>
          <CardValue
            iconName="lightbulb"
            color={logoOrange}
            value="36,9%"
            title="Realisasi Perlakuan Risiko"
            darkMode={darkMode}
          />
          <CardValue
            iconName="list-check"
            color={logoBlue}
            value="57,8%"
            title="Efektivitas Perlakuan Risiko"
            darkMode={darkMode}
          />
          <CardValue
            titleSize={16}
            column={2}
            iconName="equals"
            color={logoBrown}
            value="5"
            title="Jumlah Perlakuan Risiko"
            darkMode={darkMode}
          />
          <CardValue
            titleSize={16}
            column={2}
            iconName="file-lines"
            color={logoGreen}
            value="88%"
            title="Kepatuhan Pelaporan UPR LS"
            darkMode={darkMode}
          />
          <CardValue
            titleSize={16}
            column={2}
            iconName="building"
            color={red}
            value="54"
            title="Jumlah UPR LS"
            darkMode={darkMode}
            //   total="Kementerian PPN/Bappenas"
            //   onclick={handleModalOpen}

            //  actionCard={
            //   <FormControl size="small">
            //    <SelectCustomTheme
            //     small
            //     rounded
            //     value={valueSelect}
            //     onChange={handleChangeSelect}
            //    >
            //     <MenuItem value="" disabled>
            //      <Typography fontSize={14} fontStyle="italic">
            //       Pilih KL
            //      </Typography>
            //     </MenuItem>
            //     {listKldBadanUsaha.map((badanUsaha, index) => (
            //      <MenuItem key={index} value={badanUsaha.source}>
            //       {badanUsaha.source.length >= 35 ? (
            //        <Tooltip
            //         title={badanUsaha.source}
            //         followCursor
            //         TransitionComponent={Grow}
            //        >
            //         <Typography
            //          aria-owns={open ? "mouse-over-popover" : undefined}
            //          aria-haspopup="true"
            //          onMouseEnter={handlePopoverOpen}
            //          onMouseLeave={handlePopoverClose}
            //          sx={{ fontSize: 14 }}
            //         >
            //          {badanUsaha.source.substring(0, 35) + "..."}
            //         </Typography>
            //        </Tooltip>
            //       ) : (
            //        <Typography fontSize={14}>
            //         {badanUsaha.source.substring(0, 12)}
            //        </Typography>
            //       )}
            //      </MenuItem>
            //     ))}
            //    </SelectCustomTheme>
            //   </FormControl>
            //  }
          />
        </Grid>
      </BlockCard>

      <DialogComponent
        width={300}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Pilih UPR LS"
        dialogFooter={dialogActionFooter}
      >
        <FormControl size="small" fullWidth>
          <SelectCustomTheme
            small
            rounded
            value={valueSelect}
            onChange={handleChangeSelect}
          >
            <MenuItem value="" disabled>
              <Typography fontSize={14} fontStyle="italic">
                Pilih KL
              </Typography>
            </MenuItem>
            {listKldBadanUsaha.map((badanUsaha, index) => (
              <MenuItem key={index} value={badanUsaha.source}>
                {badanUsaha.source.length >= 35 ? (
                  <Tooltip
                    title={badanUsaha.source}
                    followCursor
                    TransitionComponent={Grow}
                  >
                    <Typography
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                      sx={{ fontSize: 14 }}
                    >
                      {badanUsaha.source.substring(0, 35) + "..."}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography fontSize={14}>{badanUsaha.source}</Typography>
                )}
              </MenuItem>
            ))}
          </SelectCustomTheme>
        </FormControl>
      </DialogComponent>
    </>
  );
}
