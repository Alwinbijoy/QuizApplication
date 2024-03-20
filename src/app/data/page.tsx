import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableThree from "@/components/Tables/TableThree";

const page = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Tables" />

    <div className="flex flex-col gap-10">
      <TableThree />
    </div>
  </DefaultLayout>
);
}

export default page