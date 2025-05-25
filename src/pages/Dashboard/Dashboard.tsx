import { FC, useEffect, useState } from "react";
import "./dashboard.css";
import { CarForm, iCarModel } from "../../shared/interfaces";
import CarsModel from "../../models/CarsModel";
import { useForm } from "react-hook-form";
import useCars from "../../hooks/useCars";
import AdminCarCard from "../../components/AdminCarCard/AdminCarCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import EditCarPopup from "../../components/EditCarPopup/EditCarPopup";
import { toast } from "../../utils/toast";

const Dashboard: FC = () => {
  const existingCars = useCars();
  const carsModel = new CarsModel();
  const [cars, setCars] = useState<iCarModel[]>([]);

  const [generalError, setGeneralError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [editCar, setEditCar] = useState<iCarModel | undefined>(undefined);

  useEffect(() => {
    setCars(existingCars.cars);
  }, [existingCars]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<CarForm>();

  const images = watch("images");

  const onSubmit = async (data: CarForm) => {
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
      setGeneralError("");
    } catch (err) {
      const errorMessage = "Failed to add new car";
      setGeneralError(errorMessage);
      toast.error(errorMessage);
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

  const showEditCarPopup = (car: iCarModel) => setEditCar(car);
  const hideEditCarPopup = () => setEditCar(undefined);

  const handleUpdate = async (id: string, data: CarForm) => {
    await carsModel.updateCar(id, {
      model: data.model,
      year: data.year,
      seats: data.seats,
      pricePerDay: data.pricePerDay,
      owner: data.owner,
      images: data.images ? Array.from(data.images) : [],
      retainImageIds: data.retainImageIds,
    });
    await existingCars.refreshCars();
    hideEditCarPopup();
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
            {...register("model", { required: "Model is required" })}
          />
          <input
            type="number"
            placeholder="Year"
            {...register("year", { required: "Year is required" })}
          />
          <input
            type="number"
            placeholder="Seats"
            {...register("seats", { required: "Number of seats is required" })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price per day"
            {...register("pricePerDay", { required: "Price is required" })}
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
                {...register("images", {
                  required: "At least one image is required",
                })}
                placeholder="Upload images"
              />
            </div>
            <div className="image-preview-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={previewImages[index]}
                    alt={file.name}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
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
        {generalError && <p className="error-message">{generalError}</p>}
        {Object.values(formErrors).map((error, index) => (
          <p key={index} className="error-message">
            {error?.message}
          </p>
        ))}
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
                  handleEditCar={() => showEditCarPopup(car)}
                />
              </div>
            ))}
        </div>
      </section>
      {editCar && (
        <EditCarPopup
          car={editCar}
          hidePopup={hideEditCarPopup}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;
