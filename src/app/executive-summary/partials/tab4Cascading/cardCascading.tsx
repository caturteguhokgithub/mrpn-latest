import React from "react";
import CardItem from "@/components/cardTabItem";
import CascadingOrgChart from "./partials/org-chart";
import useCardDiagramVM from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramVM";
import { Button, DialogActions } from "@mui/material";
import FormNomenklatur from "@/app/executive-summary/partials/tab4Cascading/partials/form-nomenklatur";
import DialogComponent from "@/components/dialog";
import { del } from "@/lib/core/api/apiBase";

export default function CardCascading({ project }: { project: string }) {
  const {
    optionStakeholder,
    optionProp,
    data,
    modal,
    setModal,
    state,
    setState,
    createData,
    deleteData,
  } = useCardDiagramVM();

  return (
    <CardItem title="Cascading">
      {data !== undefined && (
        <CascadingOrgChart
          setModal={setModal}
          data={data}
          setState={setState}
          deleteData={deleteData}
        />
      )}

      <DialogComponent
        width={"90%"}
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Nomenklatur IKU"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => createData()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormNomenklatur
          optionProp={optionProp}
          optionStakeholder={optionStakeholder}
          state={state}
          setState={setState}
        />
      </DialogComponent>
    </CardItem>
  );
}
