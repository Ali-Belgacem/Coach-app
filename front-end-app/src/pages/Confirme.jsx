import React, { useState } from "react";
import { assets } from "../assets/index";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "../useLanguage";

const Confirme = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    email: "",
    telephone: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Créer une URL pour la prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.date ||
      !formData.image ||
      !formData.email ||
      !formData.telephone
    ) {
      toast.error(
        t("Veuillez remplir tous les champs et sélectionner une image"),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("image", formData.image);

      await axios.post("http://localhost:5000/api/clients", formDataToSend);

      toast.success(t("Informations enregistrées avec succès !"));

      // Réinitialiser le formulaire
      setFormData({
        firstName: "",
        lastName: "",
        date: "",
        email: "",
        telephone: "",
        image: null,
      });
      setPreviewImage(null);
      document.getElementById("image-upload").value = "";
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("Une erreur est survenue lors de l'envoi des données"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("Entrez vos informations")}
      </h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Prénom")}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t("Prénom")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Nom")}
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t("Nom")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Numéro de téléphone")}
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            placeholder={t("Numéro de téléphone")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("Email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Date de naissance")}
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("Upload Image")}
        </label>

        {/* Input file caché */}
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          required
        />

        {/* Zone cliquable pour upload */}
        <label
          htmlFor="image-upload"
          className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="mx-auto max-h-48 rounded-md"
            />
          ) : (
            <>
              <img
                src={assets.upload_area}
                alt="Upload area"
                className="mx-auto h-24 opacity-70 mb-2"
              />
              <p className="text-sm text-gray-500">
                {t("Cliquez pour uploader ou glisser-déposer")}
              </p>
              <p className="text-xs text-gray-400">
                {t("PNG, JPG (MAX. 5MB)")}
              </p>
            </>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? t("Envoi en cours...") : t("Confirmer")}
      </button>
    </form>
  );
};

export default Confirme;
