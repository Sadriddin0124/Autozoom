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

export const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState("");
    const [images, setImages] = useState("");
    const [slug, setSlug] = useState("");
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [data, setData] = useState({ name: "", slug: "", text: "", images: "" });

    const token = localStorage.getItem("accessToken");

    const getLocations = () => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
            .then(res => res.json())
            .then(data => {
                setLocations(data?.data || []);
            }).catch(err => {
                console.log(err);
                toast.error("Failed to fetch locations");
            });
    };

    useEffect(() => {
        getLocations();
    }, []);

    const handleFileChange = (event) => {
        setImages(event.target.files[0]);
    };

    const locationsCreate = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("images", images);
        formData.append("text", text);
        formData.append("slug", slug);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations", {
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
                    getLocations();
                    handleClose();
                    setName("");
                    setText("");
                    setSlug("");
                    setImages("");
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
    }
    const handleClose = () => {
        setOpen(false);
        setName("");
        setImages("");
        setText("");
        setSlug("");
    };
    const handleEdit = (item) => {
        setId(item.id);
        setOpen3(true);
        setData({ name: item.name, images: item.images, text: item.text });
    };
    const handleOk = (id) => {
        setId(id);
        setOpen2(true);
    };

    const editLocations = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        if (images) {
            formData.append("images", images);
        }
        formData.append("text", data.text);
        formData.append("slug", data.slug);

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then(response => response.json()).then(response => {
            if (response.success) {
                toast.success("Locations updated successfully");
                getLocations();
                setOpen3(false);
                setData({ name: "", slug: "", text: "", images: "" });
            } else {
                toast.error("Error updating locations");
            }
        }).catch(error => {
            console.log(error);
            toast.error("An error occurred: " + error.message);
        });
    };


    const deleteLocations = (e) => {
        e.preventDefault();
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const newLocations = locations.filter(item => item.id !== id);
                    setLocations(newLocations);
                    setOpen2(false);
                    toast.success("Locations deleted successfully");
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
            <button onClick={handleOpen} className="btn bg-indigo-500 text-white hover:bg-indigo-700 px-4 py-2">
                Add Location
            </button>
            <table className="w-full border-collapse border border-slate-500">
                <thead className="bg-slate-300">
                    <tr>
                        <th className="border border-slate-600 px-4 py-2">Name</th>
                        <th className="border border-slate-600 px-4 py-2">Slug</th>
                        <th className="border border-slate-600 px-4 py-2">Text</th>
                        <th className="border border-slate-600 px-4 py-2">Images</th>
                        <th className="border border-slate-600 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-100">
                    {locations?.map((item, index) => (
                        <tr key={index} className="border border-slate-500 text-center">
                            <td className="text-lg text-black border border-slate-600 px-4 py-2">{item?.name}</td>
                            <td className="text-lg text-black border border-slate-600 px-4 py-2">{item?.slug}</td>
                            <td className="text-lg text-black border border-slate-600 px-4 py-2">{item?.text}</td>
                            <td className="text-lg text-black border border-slate-600 px-4 py-2">
                                <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="" />
                            </td>
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
                        <form onSubmit={locationsCreate}>
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
                                <label className="block text-lg mb-2">Slug</label>
                                <input
                                    onChange={(e) => setSlug(e.target.value)}
                                    type="text"
                                    placeholder="Text"
                                    value={slug}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg mb-2">Text</label>
                                <input
                                    onChange={(e) => setText(e.target.value)}
                                    type="text"
                                    placeholder="Text"
                                    value={text}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} required />
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
                            <button onClick={deleteLocations} className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2">
                                Delete
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal open={open3} onClose={() => setOpen3(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <form onSubmit={editLocations}>
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
                                <label className="block text-lg mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData({ ...data, slug: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg mb-2">Text</label>
                                <input
                                    type="text"
                                    value={data.text}
                                    onChange={(e) => setData({ ...data, text: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
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
