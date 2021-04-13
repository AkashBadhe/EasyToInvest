import React, { useMemo } from "react";
import useFetch from "use-http";
import urls from "./config";
import tableHeader from "./tableHeader";
import Table from './Table';
export default function StocksList() {
  const { loading, error, data = { data: []} } = useFetch(urls.INDICES_WATCH_URL, {}, []);

  const columns = React.useMemo(() => tableHeader, []);

  const TableMemo = useMemo(() => {
      console.log(data);
      return <Table columns={columns} data={data.data} />
  }, [data]);

  return (
    <>
      {error && "Error!"}
      {loading && "Loading..."}
      {TableMemo}
    </>
  );
}
