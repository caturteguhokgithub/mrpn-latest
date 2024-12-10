import theme from "@/theme";
import {
  Paper,
  Typography,
  Grid,
  alpha,
  Stack,
  Icon,
  Box,
  Tooltip,
  Grow,
} from "@mui/material";

type ICard = {
  iconName: string;
  color: string;
  value?: string;
  total?: string;
  title: string;
  column?: number;
  titleSize?: number;
  actionCard?: React.ReactNode;
  onclick?: () => void;
  darkMode?: boolean;
};

export const BlockCard = ({
  title,
  children,
  bgcolor,
  cardAction,
  darkMode,
}: {
  title?: string;
  children?: React.ReactNode;
  bgcolor?: string;
  cardAction?: React.ReactNode;
  darkMode?: boolean;
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "1.25rem",
        p: "1.5rem",
        m: 1,
        bgcolor: bgcolor
          ? bgcolor
          : !darkMode
          ? "white"
          : "rgba(31, 41, 55, 0.5)",
        backdropFilter: "blur(7.8px)",
        border: !darkMode
          ? "1px solid rgba(31, 41, 55, 0.1)"
          : "1px solid rgba(31, 41, 55, 0.37)",
      }}
    >
      {title ? (
        <>
          {cardAction ? (
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={600}
                mb={2}
                color={darkMode ? "white" : theme.palette.secondary.dark}
              >
                {title}
              </Typography>
              {cardAction}
            </Stack>
          ) : (
            <Typography
              fontSize={18}
              fontWeight={600}
              mb={2}
              color={darkMode ? "white" : theme.palette.secondary.dark}
            >
              {title}
            </Typography>
          )}
          {children}
        </>
      ) : (
        children
      )}
    </Paper>
  );
};

export const CardValue = ({
  iconName,
  color,
  value,
  total,
  title,
  column,
  titleSize,
  actionCard,
  onclick,
  darkMode,
}: ICard) => {
  const contentCardValue = (
    <Stack
      direction="column"
      justifyContent="space-between"
      height="100%"
      p="1.25rem"
      borderRadius="16px"
      bgcolor={alpha(color, 0.2)}
      border={`1px solid ${color}`}
      sx={{
        height: "140px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          //   bgcolor={color}
          //   width="40px"
          //   height="40px"
          //   borderRadius="50%"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            baseClassName="fas"
            className={`fa-${iconName}`}
            sx={{ fontSize: "32px", color: color }}
          />
        </Stack>
        {actionCard ? (
          <Stack direction="row" alignItems="center" gap={1}>
            {actionCard}
            <Typography
              component="span"
              fontSize="2rem"
              fontWeight={800}
              color={color}
            >
              {value}
            </Typography>
          </Stack>
        ) : (
          <Typography
            component="span"
            fontSize="2rem"
            fontWeight={800}
            color={color}
          >
            {value}
          </Typography>
        )}
      </Stack>
      <Stack direction="column">
        {total ? (
          <Typography color={color} fontSize="12px" fontWeight="500">
            {total}
          </Typography>
        ) : null}
        <Typography
          fontSize={titleSize ? `${titleSize}px` : "18px"}
          textTransform="capitalize"
          fontWeight={700}
          lineHeight={1.3}
          color={darkMode ? "white" : theme.palette.secondary.dark}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Grid item xs={12} md={column ? column : 3}>
      <Box
        onClick={onclick}
        sx={{
          userSelect: "none",
          cursor: onclick?.length === 0 ? "pointer" : "default",
        }}
      >
        {onclick ? (
          <Tooltip
            title="Klik untuk ubah UPR LS"
            followCursor
            TransitionComponent={Grow}
          >
            {contentCardValue}
          </Tooltip>
        ) : (
          contentCardValue
        )}
      </Box>
    </Grid>
  );
};
