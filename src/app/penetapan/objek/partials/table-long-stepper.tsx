import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableLonglistStepOne from "./table-long-step-1";
import TableLonglistStepTwo from "./table-long-step-2";
import {
  useAuthContext,
  usePenetapanTopicContext,
} from "@/lib/core/hooks/useHooks";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { Stack } from "@mui/material";

const steps = [
  "Dasar Pemilihan Prioritas Objek MRPN LS",
  "Rangking Pemilihan Prioritas Objek MRPN LS",
];

export default function TableLonglistStepper({
  handleOpenShortlist,
  handleRanking,
  stateApproval,
}: {
  handleOpenShortlist?: () => void;
  handleRanking?: any;
  stateApproval?: any;
}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const { uraianState, setUraianState } = usePenetapanTopicContext(
    (state) => state
  );

  const { manipulateStateUraianPriority } = usePenetapanObjectVM();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    const prevUraianState = JSON.parse(JSON.stringify(uraianState));
    const updateStateUraian = manipulateStateUraianPriority(prevUraianState);
    setUraianState(updateStateUraian);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleRanking();
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack direction="column" gap={2} alignItems="stretch">
      {!["approved", "review"].includes(stateApproval?.status) && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            //  if (isStepOptional(index)) {
            //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
            //  }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Semua langkah sudah selesai
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {!["approved", "review"].includes(stateApproval?.status) ? (
            <>
              {activeStep === 0 && <TableLonglistStepOne />}
              {activeStep === 1 && <TableLonglistStepTwo />}
            </>
          ) : (
            <TableLonglistStepTwo />
          )}
          {!["approved", "review"].includes(stateApproval?.status) && (
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {activeStep === 0 ? null : (
                  <Button
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ borderRadius: 24, mr: 1, px: 4 }}
                  >
                    Kembali
                  </Button>
                )}

                <Box sx={{ flex: "1 1 auto" }} />
                {hasPrivilege(permission, pathname, "add") ||
                hasPrivilege(permission, pathname, "update") ||
                hasPrivilege(permission, pathname, "delete") ? (
                  <Button
                    onClick={
                      activeStep === steps.length - 1
                        ? handleOpenShortlist
                        : handleNext
                    }
                    variant="contained"
                    sx={{ borderRadius: 24, px: 4 }}
                  >
                    {activeStep === steps.length - 1 ? "Selesai" : "Simpan"}
                  </Button>
                ) : (
                  activeStep < steps.length - 1 && (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      sx={{ borderRadius: 24, px: 4 }}
                    >
                      Selanjutnya
                    </Button>
                  )
                )}
              </Box>
            </>
          )}
        </React.Fragment>
      )}
    </Stack>
  );
}
