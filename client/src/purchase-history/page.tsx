import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../(components)/loading";
import { useGetOneCustomerQuery } from "../state/api";
//import { fetchCustomerPurchases } from "../state/api";

export const CustomerDetails = () => {
  const { customer_id } = useParams();
  const user_id = { user_id: localStorage.getItem("user_id") };
  const corr_user_id = user_id.user_id;
  const [purchases, setPurchases] = useState([]);
  console.log(corr_user_id);
  const {
    data: customers,
    isError,
    isLoading,
  } = useGetOneCustomerQuery({ corr_user_id, customer_id });

  console.log(customers?.customer_info.name);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {customers?.customer_info.name}
      </h2>
    </div>
  );
};
