import {useEffect, useState} from "react";
import {API_CODE} from "@/lib/core/api/apiModel";
import {LogActivity} from "@/app/log-activity/pageModel";
import {doGetLogActivity} from "@/app/log-activity/pageService";

const useLogActivityVM = () => {

  const [data, setData] = useState<LogActivity[]>([])

  const getData = async () => {
    const response = await doGetLogActivity()
    if (response?.code === API_CODE.success) {
      let result: LogActivity[] = response.result
      setData(result)
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return {
    data
  }

}

export default useLogActivityVM;