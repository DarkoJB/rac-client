import { FC, useEffect, useState } from "react";
import "./dashboard.css";
import { AddCarForm, iCarModel } from "../../shared/interfaces";
import CarsModel from "../../models/CarsModel";
import { useForm } from "react-hook-form";
import useCars from "../../hooks/useCars";
import AdminCarCard from "../../components/AdminCarCard/AdminCarCard";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Dashboard: FC = () => {
  const existingCars = useCars();
  const carsModel = new CarsModel();
  const [cars, setCars] = useState<iCarModel[]>([]);

  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    setCars(existingCars.cars);
  }, [existingCars]);

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<AddCarForm>();

  const images = watch("images");

  const onSubmit = async (data: AddCarForm) => {
    try {
      const response = await carsModel.addCar({
        model: data.model,
        year: data.year,
        seats: data.seats,
        pricePerDay: data.pricePerDay,
        owner: data.owner,
        images: data.images ? Array.from(data.images) : [],
      });

      setCars((prev) => [...prev, response]);
      reset();
      setPreviewImages([]);
      setError("");
    } catch (err) {
      setError("Failed to add new car.");
    }
  };

  useEffect(() => {
    if (!images || images.length === 0) {
      setSelectedFiles([]);
      setPreviewImages([]);
      return;
    }

    const files = Array.from(images);
    const previews = files.map((file) => URL.createObjectURL(file));

    setSelectedFiles(files);
    setPreviewImages(previews);

    return () => {
      // Revoke object URLs to avoid memory leaks
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleOpenImageUpload = (): void => {
    document.getElementById("upload-images")?.click();
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove,
    );
    const updatedPreviews = previewImages.filter(
      (_, index) => index !== indexToRemove,
    );

    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));
    setValue("images", dataTransfer.files); // Update hook form value
  };

  const handleDeleteCar = async (id?: string) => {
    await carsModel.deleteCar(id);
    await existingCars.refreshCars();
  };

  return (
    <div className="page-container">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your fleet easily</p>
      </section>

      <section className="add-car-form">
        <h2>Add New Car</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Model"
            {...register("model", { required: true })}
          />
          <input
            type="number"
            placeholder="Year"
            {...register("year", { required: true })}
          />
          <input
            type="number"
            placeholder="Seats"
            {...register("seats", { required: true })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price per day"
            {...register("pricePerDay", { required: true })}
          />
          <input
            type="text"
            placeholder="Owner (optional)"
            {...register("owner")}
          />
          <div className="image-upload-section">
            <div className="upload-input">
              <button type="button" onClick={handleOpenImageUpload}>
                Upload images
              </button>
              <input
                id="upload-images"
                type="file"
                multiple
                accept="image/*"
                {...register("images")}
                placeholder="Upload images"
              />
            </div>
            <div className="image-preview-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={previewImages[index]}
                    alt={file.name}
                    className="thumbnail"
                  />
                  <span className="filename">{file.name}</span>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <IoIosCloseCircleOutline size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-button">
            Add Car
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>

      <section className="cars-list">
        <div className="title-search-wrapper">
          <h2>Existing Cars</h2>
          <input type="text" placeholder="Search cars" />
        </div>
        <div className="car-grid">
          {cars &&
            cars.map((car, index) => (
              <div key={index}>
                <AdminCarCard
                  car={car}
                  handleDeleteCar={() => handleDeleteCar(car._id)}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
