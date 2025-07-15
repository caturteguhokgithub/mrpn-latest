import {Stack, Typography} from "@mui/material";
import { grey } from "@mui/material/colors";
import {useEffect, useState} from "react";
import {GetCronjobServiceResModel} from "@/app/misc/cronjob/cronjobServiceModel";
import {doGetCronjob} from "@/app/misc/cronjob/cronjobService";
import {API_CODE} from "@/lib/core/api/apiModel";
import dayjs from "dayjs";

export default function Footer({}) {

  const [data, setData] = useState<GetCronjobServiceResModel[]>([])

  const getCronjobData = async () => {
    const response = await doGetCronjob()
    if (response?.code == API_CODE.success){
      const result:GetCronjobServiceResModel[] = response.result

      result.sort((a, b) => b.id - a.id);
      setData(result)
    }
  }

  useEffect(() => {
    getCronjobData()
  }, []);

  return <Stack flexDirection={"row"} justifyContent={"space-between"}>
    <Typography fontSize={14} color={grey[600]} py={2}>
      {/* Hak Cipta &copy; {new Date().getFullYear()} | MRPN Pranala - Kementerian
    PPN/Bappenas. All Rights Reserved */}
      Hak Cipta &copy; {new Date().getFullYear()} | MRPN - Kementerian
      PPN/Bappenas. All Rights Reserved
    </Typography>
    {data.length > 0 &&
        <Typography fontSize={14} color={grey[600]} py={2}>
            Update Krisna: {dayjs(data[0].created_at).format("DD MMM YYYY")}
        </Typography>
    }
  </Stack>;
}
