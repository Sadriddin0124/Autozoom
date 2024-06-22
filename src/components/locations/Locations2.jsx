import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";

const Locations = () => {
  const initialFormData = {
    name: "",
    slug: "",
    images: [],
    text: "",
    editName: "",
    editSlug: "",
    editImage: [],
    editText: "",
    prevImage: "",
    search: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Asl data uchun state
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const token = localStorage.getItem("accessToken");
  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalToggle = (type) => {
    if (type === "add") setAddModal(!addModal);
    else if (type === "edit") setOpenModal(!openModal);
    setFormData(initialFormData);
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setFormData({ ...formData, search: text });

    if (text === "") {
      setData(originalData); // Asl dataga qaytarish
    } else {
      setData(originalData.filter((item) => item.name.toLowerCase().includes(text)));
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setData(result?.data);
        setOriginalData(result?.data); // Asl data saqlash
        setLoading(false);
      } else {
        toast.error("Ma'lumotlarni olib bo'lmadi", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const handleFormSubmit = async (e, url, method) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name || formData.editName);
    formDataToSend.append("slug", formData.slug || formData.editSlug);
    formDataToSend.append("text", formData.text || formData.editText);
    const images = formData.images[0] || formData.editImage[0];
    if (images) formDataToSend.append("images", images);

    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend
      });
      if (response.ok) {
        toast.success(`Malumot muvaffaqqiyatli ${method === "POST" ? "qo'shildi" : "yangilandi"}!`, { autoClose: 2000 });
        fetchData();
        handleModalToggle(method === "POST" ? "add" : "edit");
      } else {
        toast.error(`Malumot ${method === "POST" ? "qo'shilmadi" : "yangilanmadi"}!`, { autoClose: 2000 });
      }
    } catch (error) {
      console.error(`error ${method === "POST" ? "adding" : "updating"} locations`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("Malumot muvaffaqqiyatli o'chirildi!", { autoClose: 2000 });
        fetchData();
      } else {
        toast.error("Malumotni o'chirishda xatolik yuz berdi!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("error deleting locations", error);
    }
  };

  const handleEdit = async (id) => {
    handleModalToggle("edit");
    try {
      const response = await fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setFormData({
          ...formData,
          editName: result?.data?.name,
          editSlug: result?.data?.slug,
          editText: result?.data?.text,
          prevImage: imgUrl + result?.data?.image_src
        });
        localStorage.setItem("selectedId", id);
      } else {
        toast.error("Ma'lumotlarni olib bo'lmadi", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("error fetching edit data", error);
    }
  };

  return (
    <>
      <ToastContainer />
      { (
        <>
          <div className="mt-12 w-full overflow-hidden p-2">
            <div className="h-screen bg-white shadow-lg p-2 flex flex-col gap-4">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center mt-5 ml-7 w-1/5 gap-4 border border-blue-800 p-5 rounded-lg">
                  <FaSearch className="text-blue-800 text-2xl" />
                  <input
                    type="text"
                    value={formData.search}
                    onChange={handleSearch}
                    placeholder="Search Locations"
                    className="outline-none border-none bg-transparent"
                  />
                </div>
                <button className="bg-blue-800 text-white py-2 px-4 rounded-lg cursor-pointer" onClick={() => handleModalToggle("add")}>
                  Add Location
                </button>
              </div>
              <table className="w-full border border-slate-800 text-center">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th>№</th>
                    <th>Nomi</th>
                    <th>Slug</th>
                    <th>Image</th>
                    <th>Information</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id} className="text-black border border-slate-800">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.slug}</td>
                      <td>
                        <img src={imgUrl + item.image_src} className="w-12 h-12 p-1" alt="rasm" />
                      </td>
                      <td>{item.text}</td>
                      <td>
                        <button className="bg-blue-800 text-white py-1 px-2 rounded-lg hover:bg-blue-500" onClick={() => handleEdit(item.id)}>Edit</button>
                        <button className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700 ml-2" onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {addModal && (
            <Modal
              title="Add Location"
              handleModalToggle={() => handleModalToggle("add")}
              handleSubmit={(e) => handleFormSubmit(e, "https://autoapi.dezinfeksiyatashkent.uz/api/locations", "POST")}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {openModal && (
            <Modal
              title="Edit Locations"
              handleModalToggle={() => handleModalToggle("edit")}
              handleSubmit={(e) => handleFormSubmit(e, `https://autoapi.dezinfeksiyatashkent.uz/api/locations/${localStorage.getItem("selectedId")}`, "PUT")}
              formData={formData}
              setFormData={setFormData}
              isEdit
            />
          )}
        </>
      )}
    </>
  );
};

const Modal = ({ title, handleModalToggle, handleSubmit, formData, setFormData, isEdit = false }) => {
  return (
    <div className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-40 text-black">
      <div className="bg-white m-1 p-1 shadow-2xl mt-8 lg:w-[50%] lg:ml-[25%]">
        <div className="flex justify-between items-center p-3 bg-blue-800 text-white">
          <h2>{title}</h2>
          <button onClick={handleModalToggle}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-2">
          <input
            type="text"
            value={isEdit ? formData.editName : formData.name}
            onChange={(e) => setFormData({ ...formData, [isEdit ? "editName" : "name"]: e.target.value })}
            placeholder="Enter location name"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            value={isEdit ? formData.editSlug : formData.slug}
            onChange={(e) => setFormData({ ...formData, [isEdit ? "editSlug" : "slug"]: e.target.value })}
            placeholder="Enter location slug"
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            value={isEdit ? formData.editText : formData.text}
            onChange={(e) => setFormData({ ...formData, [isEdit ? "editText" : "text"]: e.target.value })}
            placeholder="Enter location information"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, [isEdit ? "editImage" : "images"]: e.target.files })}
            className="w-full p-2 border rounded-lg"
          />
          {isEdit && formData.prevImage && <img src={formData.prevImage} className="w-24 h-24 object-cover" alt="prev image" />}
          <button type="submit" className="w-full p-2 bg-blue-800 text-white rounded-lg">{isEdit ? "Edit" : "Add"}</button>
        </form>
      </div>
    </div>
  );
};

export default Locations;
