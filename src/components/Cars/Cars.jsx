import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCar } from "../../actions/cars.action";
import AddCar from "../Modals/AddCar";
import DeleteCar from "../Modals/DeleteCar";

const Cars = () => {
  const [carsData, setCarsData] = useState([]);
  const [addCar, setAddCar] = useState(false);
  const [deleteCar, setDeleteCar] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [ID, setID] = useState("");

  useEffect(() => {
    receiveCars();
  }, []);

  const receiveCars = async () => {
    const res = await getCar();
    setCarsData(res?.data);
    console.log(res);
  };

  const editCar = (item) => {
    setAddCar(true);
    setEditItem(item);
  };

  const removeCar = (id) => {
    setID(id);
    setDeleteCar(true);
  };

  const toggle = () => {
    setAddCar(false);
    setEditItem(null);
    setDeleteCar(false);
  };

  return (
    <div>
      <AddCar open={addCar} toggle={toggle} editItem={editItem} setCarsData={setCarsData} />
      <DeleteCar open={deleteCar} toggle={toggle} setCars={setCarsData} id={ID} />
      <div className="flex flex-col gap-[20px] items-start px-[20px]">
        <button className="px-[12px] py-[8px] text-white bg-indigo-950 rounded-md" onClick={() => setAddCar(true)}>Add Car</button>
        <table className="w-[100%] border bg-white text-black">
          <thead className=" bg_main">
            <tr>
              <th className="border p-[10px]">T/R</th>
              <th className="border p-[10px]">Brand Title</th>
              <th className="border p-[10px]">Category EN/RU</th>
              <th className="border p-[10px]">City</th>
              <th className="border p-[10px]">Color</th>
              <th className="border p-[10px]">Model</th>
              <th className="border p-[10px]">Year</th>
              <th className="border p-[10px]">Price</th>
              <th className="border p-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {carsData?.map((item, index) => (
              <tr key={index} className="group">
                <th className="border p-[5px]">{index + 1}</th>
                <th className="border p-[5px]">{item?.brand?.title}</th>
                <th className="border p-[5px]">{item?.category?.name_en}/{item?.category?.name_ru}</th>
                <th className="border p-[5px]">{item?.city?.name}</th>
                <th className="border p-[5px]">{item?.color}</th>
                <th className="border p-[5px]">{item?.model?.name}</th>
                <th className="border p-[5px]">{item?.year}</th>
                <th className="border p-[5px]">{item?.price_in_usd}</th>
                <th className="border p-[5px]">
                  <button
                  className="px-[12px] py-[2px] bg-indigo-600 text-white"
                    onClick={() => editCar(item)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => removeCar(item?.id)}
                    className="px-[12px] py-[2px] bg-red-600 text-white"
                  >
                    <DeleteIcon />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
