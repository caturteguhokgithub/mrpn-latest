import React from "react";
import {
  alpha,
  Avatar,
  Card,
  CardContent,
  FormControl,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { IconFA } from "@/components/icons/icon-fa";
import { grey } from "@mui/material/colors";

const CardItem = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${grey[300]}`,
        borderRadius: 5,
        bgcolor: alpha(color, 0.6),
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                variant="overline"
                fontSize={15}
              >
                {label}
              </Typography>
              <Typography variant="h4" fontWeight={700} color={color}>
                {value}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: color,
                height: "56px",
                width: "56px",
              }}
            >
              <IconFA name={icon} size={22} />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function CardGroup() {
  return (
    <Grid container spacing={2}>
      <Grid item lg={3} sm={6} xs={12}>
        <CardItem
          label="Mengumpulkan Tepat Waktu"
          value={56}
          color="#33CC33"
          icon="calendar-check"
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <CardItem
          label="Mengumpulkan Tidak Tepat Waktu"
          value={22}
          color="#CC9933"
          icon="hourglass-half"
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <CardItem
          label="Tidak Mengumpulkan"
          value={3}
          color="#EF4444"
          icon="xmark"
        />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <CardItem
          label="Total UPR LS"
          value={60}
          color="#00CCFF"
          icon="building"
        />
      </Grid>
    </Grid>
  );
}
