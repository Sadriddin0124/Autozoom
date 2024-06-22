import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import UploadImage from "../../assets/upload.png";
import {
  base_url,
  getBrand,
  getCar,
  getCategories,
  getCities,
  getLocation,
  getModels,
  postCar,
  updateCar,
} from "../../actions/cars.action";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddCar = ({ open, toggle, editItem, setCarsData }) => {
  const [color, setColor] = React.useState("");
  const [year, setYear] = React.useState("");
  const [seconds, setSeconds] = React.useState("");
  const [max_speed, setMaxSpeed] = React.useState("");
  const [max_people, setMaxPeople] = React.useState("");
  const [transmission, setTransmission] = React.useState("");
  const [motor, setMotor] = React.useState("");
  const [drive_side, setDriveSide] = React.useState("");
  const [petrol, setPetrol] = React.useState("");
  const [limitperday, setLimitPerDay] = React.useState("");
  const [deposit, setDeposit] = React.useState("");
  const [premiumProtection, setPremiumProtection] = React.useState("");
  const [priceAED, setPriceAED] = React.useState("");
  const [priceUSD, setPriceUSD] = React.useState("");
  const [priceAEDSale, setPriceAEDSale] = React.useState("");
  const [priceUSDSale, setPriceUSDSale] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const [cityId, setCityId] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [locationId, setLocationId] = React.useState("");
  const [inclusive, setInclusive] = React.useState(false);
  const [image, setImage] = React.useState();
  const [image2, setImage2] = React.useState();
  const [image3, setImage3] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getCars = async () => {
    const res = await getCar();
    setCarsData(res?.data);
  };

  const getData = async () => {
    const brand = await getBrand();
    setBrands(brand?.data);
    const models = await getModels();
    setModels(models?.data);
    const city = await getCities();
    setCities(city?.data?.data);
    const category = await getCategories();
    setCategories(category?.data?.data);
    const location = await getLocation();
    setLocations(location?.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    brandId ? formData.append("brand_id", brandId) : editItem?.brand_id;
    modelId ? formData.append("model_id", modelId) : editItem?.model_id;
    cityId ? formData.append("city_id", cityId) : editItem?.city_id;
    categoryId
      ? formData.append("category_id", categoryId)
      : editItem?.category_id;
    color ? formData.append("color", color) : editItem?.color;
    year ? formData.append("year", year) : editItem?.year;
    seconds ? formData.append("seconds", seconds) : editItem?.seconds;
    max_speed ? formData.append("max_speed", max_speed) : editItem?.max_speed;
    max_people
      ? formData.append("max_people", max_people)
      : editItem?.max_people;
    transmission
      ? formData.append("transmission", transmission)
      : editItem?.transmission;
    motor ? formData.append("motor", motor) : editItem?.motor;
    drive_side
      ? formData.append("drive_side", drive_side)
      : editItem?.drive_side;
    petrol ? formData.append("petrol", petrol) : editItem?.petrol;
    limitperday
      ? formData.append("limitperday", limitperday)
      : editItem?.limitperday;
    deposit ? formData.append("deposit", deposit) : editItem?.deposit;
    premiumProtection
      ? formData.append("premium_protection", premiumProtection)
      : editItem?.premium_protection;
    priceAED
      ? formData.append("price_in_aed", priceAED)
      : editItem?.price_in_aed;
    priceAEDSale
      ? formData.append("price_in_aed_sale", priceAEDSale)
      : editItem?.price_in_aed_sale;
    priceUSD
      ? formData.append("price_in_usd", priceUSD)
      : editItem?.price_in_usd;
    priceUSDSale
      ? formData.append("price_in_usd_sale", priceUSDSale)
      : editItem?.price_in_usd_sale;
    locationId
      ? formData.append("location_id", locationId)
      : editItem?.location_id;
    inclusive
      ? formData.append("inclusive", inclusive.toString())
      : editItem?.inclusive;
    if (image && image2 && image3) {
      formData.append("images", image);
      formData.append("images", image2);
      formData.append("cover", image3);
    }
    if (editItem !== null) {
      const res = await updateCar(editItem?.id, formData);
      console.log(res);
      if (res?.success === true) {
        toast.success(res?.message);
        setLoading(false);
        toggle();
        getCars();
      }
    } else {
      const res = await postCar(formData);
      if (res?.success === true) {
        toast.success(res?.message);
        setLoading(false);
        toggle();
        getCars();
      }
    }
  };

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImage2, setSelectedImage2] = React.useState(null);
  const [selectedImage3, setSelectedImage3] = React.useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    setImage(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageCover = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    setImage3(file);
    reader.onload = () => {
      setSelectedImage3(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageSelect2 = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    setImage2(file);
    reader.onload = () => {
      setSelectedImage2(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-[24px] text-center">
            {editItem?.id ? "Edit Car" : "Add Car"}
          </h1>
          <form
            id="cars"
            className="h-[80vh] py-[10px] overflow-y-auto text-black flex flex-col items-center gap-[10px]"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-[20px]">
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <img
                  src={
                    selectedImage
                      ? selectedImage.toString()
                      : editItem?.car_images
                      ? `${base_url}/uploads/images/${editItem.car_images[1]?.image?.src}`
                      : UploadImage
                  }
                  alt="image"
                  width={500}
                  height={500}
                  className="w-[100%] h-[100%] object-contain"
                />
                <input
                  required={!editItem?.id}
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute cursor-crosshair w-[100%] h-[100%] top-0 left-0 opacity-0"
                />
              </div>
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <img
                  src={
                    selectedImage2
                      ? selectedImage2.toString()
                      : editItem?.car_images
                      ? `${base_url}/uploads/images/${editItem.car_images[1]?.image?.src}`
                      : UploadImage
                  }
                  alt="image"
                  className="w-[100%] cursor-crosshair h-[100%] object-contain"
                />
                <input
                  required={!editItem?.id}
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect2}
                  className="absolute w-[100%] h-[100%] top-0 left-0 opacity-0"
                />
              </div>
              <div className="w-[100%] h-[50px] relative cursor-crosshair">
                <img
                  src={
                    selectedImage3
                      ? selectedImage3.toString()
                      : editItem?.cover_image
                      ? `${base_url}/uploads/images/${editItem.cover_image?.src}`
                      : UploadImage
                  }
                  alt="image"
                  className="cursor-crosshair w-[100%] h-[100%] object-contain"
                />
                <input
                  required={!editItem?.id}
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleImageCover}
                  className="absolute w-[100%] h-[100%] top-0 left-0 opacity-0"
                />
              </div>
            </div>
            <select
              required
              onChange={(e) => setBrandId(e.target.value)}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
              value={brandId ? brandId : editItem?.brand_id}
            >
              <option value="" hidden>
                Select Brand
              </option>
              {brands?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.title}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setModelId(e.target.value)}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
              value={modelId ? modelId : editItem?.model_id}
            >
              <option value="" hidden>
                Select Model
              </option>
              {models?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setCityId(e.target.value)}
              value={cityId ? cityId : editItem?.city_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select City
              </option>
              {cities?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId ? categoryId : editItem?.category_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select Category
              </option>
              {categories?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.name_en}
                </option>
              ))}
            </select>
            <select
              required
              onChange={(e) => setLocationId(e.target.value)}
              value={locationId ? locationId : editItem?.location_id}
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value="" hidden>
                Select Location
              </option>
              {locations?.map((item, index) => {
                return (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
            <select
              required
              onChange={(e) =>
                setInclusive(e.target.value == "1" ? true : false)
              }
              value={
                inclusive
                  ? inclusive.toString()
                  : editItem?.inclusive.toString()
              }
              className="py-[10px] border-b border-b-gray-500 w-[100%]"
            >
              <option value={0}>False</option>
              <option value={1}>True</option>
            </select>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Color"
              className="w-[100%]"
              onChange={(e) => setColor(e.target.value)}
              value={color ? color : editItem?.color}            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Year"
              className="w-[100%]"
              onChange={(e) => setYear(e.target.value)}
              value={year ? year : editItem?.year}
              inputProps={{ maxLength: 4 }}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Seconds"
              className="w-[100%]"
              onChange={(e) => setSeconds(e.target.value)}
              value={seconds ? seconds : editItem?.seconds}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Max Speed"
              className="w-[100%]"
              onChange={(e) => setMaxSpeed(e.target.value)}
              value={max_speed ? max_speed : editItem?.max_speed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Max People"
              className="w-[100%]"
              onChange={(e) => setMaxPeople(e.target.value)}
              value={max_speed ? max_speed : editItem?.max_speed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Transmission"
              className="w-[100%]"
              onChange={(e) => setTransmission(e.target.value)}
              value={transmission ? transmission : editItem?.transmission}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Motor"
              className="w-[100%]"
              onChange={(e) => setMotor(e.target.value)}
              value={motor ? motor : editItem?.motor}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Drive Side"
              className="w-[100%]"
              onChange={(e) => setDriveSide(e.target.value)}
              value={drive_side ? drive_side : editItem?.drive_side}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Petrol"
              className="w-[100%]"
              onChange={(e) => setPetrol(e.target.value)}
              value={petrol ? petrol : editItem?.petrol}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Limit per day"
              className="w-[100%]"
              onChange={(e) => setLimitPerDay(e.target.value)}
              value={limitperday ? limitperday : editItem?.limitperday}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Deposit"
              className="w-[100%]"
              onChange={(e) => setDeposit(e.target.value)}
              value={deposit ? deposit : editItem?.deposit}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Premium Protection"
              className="w-[100%]"
              onChange={(e) => setPremiumProtection(e.target.value)}
              value={premiumProtection ? premiumProtection : editItem?.premium_protection}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in AED"
              className="w-[100%]"
              onChange={(e) => setPriceAED(e.target.value)}
              value={priceAED ? priceAED : editItem?.price_in_aed}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in AED Sale"
              className="w-[100%]"
              onChange={(e) => setPriceAEDSale(e.target.value)}
              value={priceAEDSale ? priceAEDSale : editItem?.price_in_aed_sale}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in USD"
              className="w-[100%]"
              onChange={(e) => setPriceUSD(e.target.value)}
              value={priceUSD ? priceUSD : editItem?.price_in_usd}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Price in USD Sale"
              className="w-[100%]"
              onChange={(e) => setPriceUSDSale(e.target.value)}
              value={priceUSDSale ? priceUSDSale : editItem?.price_in_usd_sale}
            />
          </form>
          <div className="flex gap-[10px] justify-center py-[20px]">
            <Button variant="outlined" onClick={toggle}>
              cancel
            </Button>
            <LoadingButton
              form="cars"
              size="small"
              type="submit"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCar;
