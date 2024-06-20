import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [data, setData] = useState({ name: "", brand: "" });

  const token = localStorage.getItem("accessToken");

  const getModels = () => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then(res => res.json())
      .then(data => {
        setModels(data?.data || []);
      }).catch(err => {
        console.log(err);
        toast.error("Failed to fetch models");
      });
  };

  useEffect(() => {
    getModels();
  }, []);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data?.data);
      });
  }, []);

  const modelsCreate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand_id", brand);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getModels();
          handleClose();
          setName("");
          setBrand("");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        toast.error("An error occurred: " + err.message);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName("");
    setBrand("");
  };
  const handleEdit = (item) => {
    setId(item.id);
    setOpen3(true);
    setData({ name: item.name, brand: item.brand_id });
  };
  const handleOk = (id) => {
    setId(id);
    setOpen2(true);
  };

  const editModels = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand_id", data.brand);

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(response => response.json()).then(response => {
      if (response.success) {
        toast.success("Model updated successfully");
        getModels();
        setOpen3(false);
        setData({ name: "", brand: "" });
      } else {
        toast.error("Error updating model");
      }
    }).catch(error => {
      console.log(error);
      toast.error("An error occurred: " + error.message);
    });
  };

  const deleteModels = (e) => {
    e.preventDefault();
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const newModels = models.filter(item => item.id !== id);
          setModels(newModels);
          setOpen2(false);
          toast.success("Model deleted successfully");
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error("An error occurred: " + err.message);
      });
  };

  return (
    <div className="container mx-auto mt-5 max-w-6xl">
      <button onClick={handleOpen} className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2 mb-5">
        Add Model
      </button>
      <table className="w-full border-collapse border border-slate-500">
        <thead className="bg-slate-300">
          <tr>
            <th className="border border-slate-600 px-4 py-2">Name</th>
            <th className="border border-slate-600 px-4 py-2">Brand</th>
            <th className="border border-slate-600 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-slate-100">
          {models?.map((item, index) => (
            <tr key={index} className="border border-slate-500 text-center">
              <td className="text-lg text-black border border-slate-600 px-4 py-2">{item?.name}</td>
              <td className="text-lg text-black border border-slate-600 px-4 py-2">{item?.brand_title}</td>
              <td className="text-lg text-black border border-slate-600 px-4 py-2">
                <button className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2 mx-1" onClick={() => handleEdit(item)}>
                  <FaEdit className="text-xl" />
                </button>
                <button className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2 mx-1" onClick={() => handleOk(item.id)}>
                  <MdOutlineDeleteForever className="text-xl" />
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={modelsCreate}>
              <div className="mb-4">
                <label className="block text-lg mb-2">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Write name"
                  value={name}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2">Brand</label>
                <select
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">
                    <em>None</em>
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2">
                  Add
                </button>
                <button onClick={handleClose} className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p>Are you sure you want to delete this model?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setOpen2(false)} className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2">
                Cancel
              </button>
              <button onClick={deleteModels} className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2">
                Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={open3} onClose={() => setOpen3(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={editModels}>
              <div className="mb-4">
                <label className="block text-lg mb-2">Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg mb-2">Brand</label>
                <select
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                  value={data.brand}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2">
                  Ok
                </button>
                <button onClick={() => setOpen3(false)} className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
