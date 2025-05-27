import { FC, useEffect, useState } from "react";
import "./editCarPopup.css";
import { CarForm, iCarModel } from "../../shared/interfaces";
import { useForm } from "react-hook-form";
import { toBase64 } from "../../utils/toBase64";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { toast } from "../../utils/toast";

interface EditCarPopupProps {
  car: iCarModel;
  hidePopup: () => void;
  onUpdate: (id: string, data: CarForm) => Promise<void>;
}

const EditCarPopup: FC<EditCarPopupProps> = ({ car, hidePopup, onUpdate }) => {
  // Old images that came from the DB (with _id)
  const [oldImages, setOldImages] = useState<
    { url: string; _id?: string; state: "old" }[]
  >([]);

  // New images added in the form
  const [newImages, setNewImages] = useState<
    { url: string; file: File; state: "new" }[]
  >([]);

  // Display error messages
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors: formErrors },
  } = useForm<CarForm>({
    defaultValues: {
      model: car.model,
      year: car.year,
      seats: car.seats,
      pricePerDay: car.pricePerDay,
      owner: car.owner?.username,
    },
  });

  // Load old images once
  useEffect(() => {
    const loadOldImages = async () => {
      const loaded = await Promise.all(
        car.images!.map(async (img) => {
          const base64 = await toBase64(img.data);
          return {
            url: `data:${img.contentType};base64,${base64}`,
            _id: img._id,
            state: "old" as const,
          };
        }),
      );
      setOldImages(loaded);
    };
    loadOldImages();
  }, [car]);

  // Watch images input
  const images = watch("images");

  // Handle new image selection
  useEffect(() => {
    if (images && images.length > 0) {
      const files = Array.from(images);
      const previews = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
        state: "new" as const,
      }));
      setNewImages((prev) => [...prev, ...previews]);
    }
  }, [images]);

  const handleRemoveOldImage = (id?: string) => {
    setOldImages((prev) => prev.filter((img) => img._id !== id));
  };

  const handleRemoveNewImage = (fileToRemove: File) => {
    setNewImages((prev) => prev.filter((img) => img.file !== fileToRemove));
    const input = document.getElementById("add-images") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleOpenImageUpload = () => {
    document.getElementById("add-images")?.click();
  };

  // Discard new and old images
  const discardImageStates = () => {
    setOldImages([]);
    setNewImages([]);
  };

  const onSubmit = async (data: CarForm) => {
    try {
      const retainImageIds = oldImages.map((img) => img._id as string);

      await onUpdate(car._id!, {
        ...data,
        retainImageIds,
        images: newImages.map((img) => img.file),
      });

      reset();
      discardImageStates();
      setGeneralError("");
      hidePopup();
    } catch (err) {
      const errorMessage = "Failed to update car";
      toast.error(errorMessage);
      setGeneralError(errorMessage);
    }
  };

  return (
    <div className="popup-overlay">
      <section className="popup-form">
        <button className="close-btn" onClick={hidePopup}>
          ✕
        </button>
        <h2>Edit Car</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("model", { required: "Model is required" })}
            placeholder="Model"
          />
          <input
            type="number"
            {...register("year", { required: "Year is required" })}
            placeholder="Year"
          />
          <input
            type="number"
            {...register("seats", { required: "Number of seats is required" })}
            placeholder="Seats"
          />
          <input
            type="number"
            step="0.01"
            {...register("pricePerDay", {
              required: "Price is required",
            })}
            placeholder="Price Per Day"
          />
          <input {...register("owner")} placeholder="Owner (optional)" />
          <div className="upload-input">
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              id="add-images"
            />

            <button type="button" onClick={handleOpenImageUpload}>
              Upload images
            </button>
          </div>

          <div className="image-preview-list">
            {[...oldImages, ...newImages].map((image, index) => (
              <div key={`preview-${index}`} className="image-preview-item">
                <img
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (image.state === "old") handleRemoveOldImage(image._id);
                    else handleRemoveNewImage(image.file);
                  }}
                  className="remove-image-btn"
                  aria-label="Remove image"
                >
                  <IoIosCloseCircleOutline size={20} />
                </button>
              </div>
            ))}
          </div>
          <button type="submit">Save Changes</button>
        </form>
        {Object.values(formErrors).map((error, index) => (
          <p key={index} className="error-message">
            {error?.message}
          </p>
        ))}
        {generalError && <p className="error-message">{generalError}</p>}
      </section>
    </div>
  );
};

export default EditCarPopup;
