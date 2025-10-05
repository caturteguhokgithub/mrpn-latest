import React from "react";
import {
  Button,
  DialogActions,
  Divider,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import dynamic from "next/dynamic";
import SelectCustomTheme from "@/components/select";
import { listTahun } from "@/utils/data";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { MiscMasterRPJMNRes } from "@/app/misc/master/masterServiceModel";
import { ExsumRoadmapDto, ExsumRoadmapResDto } from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapModel";
import { grey } from "@mui/material/colors";
import { AutocompleteSelectMultiple } from "@/components/autocomplete";
import ReactQuill from "react-quill";
import DialogComponent from "@/components/dialog";
import { useRKPContext } from "@/lib/core/hooks/useHooks";


interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

const ReactQuillX = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
      return <RQ ref={forwardedRef} {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

export default function FormRoadmap({
  rpjmn,
  request,
  setRequest,
  fieldTitle,
  modal,
  handleOpenModal,
  updateData,
  dataOutput
}: {
  rpjmn: MiscMasterRPJMNRes;
  request: ExsumRoadmapDto;
  setRequest: any;
  fieldTitle: string;
  modal: any;
  handleOpenModal: any;
  updateData: any;
  dataOutput: ExsumRoadmapResDto[];
}) {

  const { year } = useRKPContext((state) => state);

  const listYearRPjmn = () => {
    let listYear = [];
    for (let i = rpjmn.start; i <= rpjmn.end; i++) {
      listYear.push(i);
    }
    return listYear;
  };

  const quillRef = React.useRef<ReactQuill>(null);

  const handleChangeQuill = async () => {
    const text = quillRef.current?.value;
    if (text) {
      setRequest((prevState: ExsumRoadmapDto) => {
        return {
          ...prevState,
          output: text.toString()
        }
      })
    }
  };

  const handleUpdateData = async () => {
    const finalReq = { ...request }
    if (fieldTitle == "Output") {
      const text = quillRef.current?.value;
      if (text) {
        finalReq.output = text.toString()
      } else {
        finalReq.output = ""
      }
    }
    updateData(finalReq);
  }

  const handleChangeYear = (newVal: number[]) => {
    setRequest((prev: ExsumRoadmapDto) => ({
      ...prev,
      year: newVal,
    }));

    const selectedYear = newVal?.[0];

    if (
      fieldTitle === "Output" &&
      selectedYear &&
      selectedYear > 0 &&
      Array.isArray(dataOutput) &&
      dataOutput.length > 0
    ) {
      const foundOutput = dataOutput.find(
        (d) => d.year === selectedYear && d.output
      );

      if (foundOutput) {
        setRequest((prev: ExsumRoadmapDto) => ({
          ...prev,
          output: foundOutput.output,
        }));
      } else {
        setRequest((prev: ExsumRoadmapDto) => ({
          ...prev,
          output: "",
        }));
      }
    }
  };


  return (
    <DialogComponent
      width={600}
      dialogOpen={modal.open}
      dialogClose={() => handleOpenModal(false, "")}
      title={modal.title}
      dialogFooter={
        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button
            variant="outlined"
            onClick={() => handleOpenModal(false, "")}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={() => handleUpdateData()}
          >
            Simpan
          </Button>
        </DialogActions>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Tahun" />
            <AutocompleteSelectMultiple
              value={request.year}
              options={year > 0 ? [year] : listYearRPjmn()}
              getOptionLabel={(option) => option.toString()}
              handleChange={(newVal: number[]) => handleChangeYear(newVal)}
              // handleChange={(newVal: number[]) =>
              //   handleChangeQuill().then(r => {
              //     setRequest((prev: ExsumRoadmapDto) => {
              //       return {
              //         ...prev,
              //         year: newVal,
              //       };
              //     })
              //   })
              // }
              placeHolder={"Pilih tahun"}
              labelSelectAll={"Pilih semua tahun"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title={fieldTitle} />

            {
              fieldTitle == "Output" ?
                <ReactQuillX
                  key={request.output.length}
                  theme="snow"
                  defaultValue={request.output}
                  value={request.output}
                  forwardedRef={quillRef}
                  onBlur={() => handleChangeQuill()}
                />
                :
                <TextareaStyled
                  aria-label={fieldTitle}
                  placeholder={fieldTitle}
                  minRows={3}
                  value={request.output}
                  onChange={(e) =>
                    setRequest((prev: ExsumRoadmapDto) => {
                      return {
                        ...prev,
                        output: e.target.value,
                      };
                    })
                  }
                />
            }

          </FormControl>
        </Grid>
      </Grid>
    </DialogComponent>
  );
}
