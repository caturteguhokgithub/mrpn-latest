"use client";

import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import PageTemaView from "@/app/penetapan/objek/pageView";
import {usePermissionChecker} from "@/lib/core/helpers/authHelpers";
import {PenetapanTopicProvider} from "@/lib/core/provider/penetapanTopicProvider";
import {defaultPenetapanObjectState} from "@/lib/core/context/penetapanTopicContext";

export default function PageTema({}) {

 usePermissionChecker("penetapan.objectUpr")

 return <DashboardLayout>
  <PenetapanTopicProvider state={defaultPenetapanObjectState}>
   <PageTemaView />
  </PenetapanTopicProvider>
 </DashboardLayout>
}
