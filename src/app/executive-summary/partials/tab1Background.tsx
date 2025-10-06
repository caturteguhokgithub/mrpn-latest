import React from "react";
import { Stack } from "@mui/material";
import CardSwot from "./tab1Background/cardSwot/cardSwot";
// import CardSwot from "@/app/executive-summary/partials/tab1Background/cardSwot";
import CardSegment from "./tab1Background/cardSegment/cardSegment";
import CardUrgent from "./tab1Background/cardUrgent/cardUrgent";

export default function Tab1Background({ project }: { project: string }) {
    return (
        <Stack gap={1}>
            <CardUrgent project={project} />
            <CardSegment project={project} />
            <CardSwot project={project} activeSetting={true} />
        </Stack>
    );
}
