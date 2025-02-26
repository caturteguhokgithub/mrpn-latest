import theme from "@/theme";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

export default function SearchResult(props: any) {
 const { title, body } = props;

 return (
  <FormControlLabel
   control={<Checkbox />}
   label={
    <Stack direction="row" gap={1}>
     <Typography color={theme.palette.secondary.dark}>{title}</Typography> -{" "}
     <Typography color={theme.palette.secondary.dark}>{body}</Typography>
    </Stack>
   }
  />
 );
}
