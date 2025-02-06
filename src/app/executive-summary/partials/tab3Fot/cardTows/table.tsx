import React, { Fragment } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { grey } from "@mui/material/colors";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogComponent from "@/components/dialog";
import FormIndication from "../form";
import { dataTema } from "@/app/executive-summary/dataTema";
import {
  ExsumTWOSDto,
  ExsumTWOSResDto,
} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import useCardLocationVM from "../../tab2Profile/cardLocation/cardLocationVM";

const TitleTableContent = ({
  title,
  infoTooltip,
  textColor,
}: {
  title: string;
  infoTooltip: React.ReactNode;
  textColor?: string;
}) => {
  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <Typography
        variant="body1"
        fontWeight={600}
        color={textColor}
        sx={{ textDecoration: "underline" }}
      >
        {title}
      </Typography>
      <InfoTooltip title={infoTooltip} />
    </Stack>
  );
};

export default function TableTows({
  data,
  conditionEditing,
}: {
  data: ExsumTWOSResDto;
  conditionEditing?: string;
}) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table size="small">
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            <TableCell>
              <Typography variant="body1" fontWeight={600}>
                Faktor Eksternal/Internal
              </Typography>
            </TableCell>
            <TableCell width="40%">
              <Typography variant="body1" fontWeight={600}>
                Strength (S)
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                Tentukan Faktor Kekuatan Internal
              </Typography>
            </TableCell>
            <TableCell width="40%">
              <Typography variant="body1" fontWeight={600}>
                Weakness (W)
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                Tentukan Faktor Kelemahan Internal
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              sx={{
                verticalAlign: "top",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                Opportunity (O)
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                Tentukan Faktor Peluang Eksternal
              </Typography>
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              <TitleTableContent
                title="Strategi SO"
                infoTooltip="Ciptakan strategi yang menggunakan kekuatan untuk memanfaatkan peluang
"
                textColor={conditionEditing}
              />
              <Typography variant="body1" color={conditionEditing}>
                <ul>
                  {data.tows.map((x) => x.type == "SO" && <li>{x.value}</li>)}
                </ul>
              </Typography>
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              <TitleTableContent
                title="Strategi WO"
                infoTooltip="Ciptakan strategi yang meminimalkan kelemahan untuk memanfaatkan peluang
"
                textColor={conditionEditing}
              />
              <Typography variant="body1" color={conditionEditing}>
                <ul>
                  {data.tows.map((x) => x.type == "WO" && <li>{x.value}</li>)}
                </ul>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
              sx={{
                verticalAlign: "top",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                Threats (T)
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                Tentukan Faktor Ancaman Eksternal
              </Typography>
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              <TitleTableContent
                title="Strategi ST"
                infoTooltip="Ciptakan strategi yang menggunakan kekuatan untuk mengatasi ancaman
"
                textColor={conditionEditing}
              />
              <Typography variant="body1" color={conditionEditing}>
                <ul>
                  {data.tows.map((x) => x.type == "ST" && <li>{x.value}</li>)}
                </ul>
              </Typography>
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              <TitleTableContent
                title="Strategi WT"
                infoTooltip="Ciptakan strategi yang meminimalkan kelemahan dan menghindari ancaman
"
                textColor={conditionEditing}
              />
              <Typography variant="body1" color={conditionEditing}>
                <ul>
                  {data.tows.map((x) => x.type == "WT" && <li>{x.value}</li>)}
                </ul>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
