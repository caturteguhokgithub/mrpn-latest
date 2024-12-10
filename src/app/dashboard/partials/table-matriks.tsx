import React from "react";
import { BlockCard } from "./card";
import Matriks from "./matriks";
import DropdownDefault from "@/components/dropdown/dropdownDefault";

export default function TableMatriks({ darkMode }: { darkMode?: boolean }) {
  const [project, setProject] = React.useState("");

  const handleChangeProject = (value: any) => {
    setProject(value);
  };
  return (
    <BlockCard
      darkMode={darkMode}
      title="Peta Risiko"
      cardAction={
        <DropdownDefault
          showOnlyName
          handleChangeProject={handleChangeProject}
          variant="primary"
        />
      }
    >
      <Matriks levelId={2} darkMode={darkMode} />
    </BlockCard>
  );
}
