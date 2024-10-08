import React from "react";
import { Stack } from "@mui/material";
import CardRelated from "./tab2Profile/cardRelated";
import CardSupport from "./tab2Profile/cardSupport";
import CardNomenklatur from "./tab2Profile/cardNomenklatur";
import CardIndicator from "./tab2Profile/cardIndicator";
import CardLocation from "./tab2Profile/cardLocation";
import CardProfilRo from "./tab2Profile/cardProfilRo";
import CardGoals from "./tab2Profile/cardGoals";

export default function Tab2Profile({ project }: { project: string }) {
 return (
  <Stack gap={1}>
   <CardNomenklatur project={project} />
   <CardGoals project={project} />
   <CardSupport project={project} />
   <CardRelated project={project} />
   <CardIndicator project={project} />
   {/* <CardProfilRo project={project} /> */}
   <CardLocation project={project} />
  </Stack>
 );
}
