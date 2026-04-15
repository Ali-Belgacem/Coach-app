import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:5000";

const normalizeName = (name = "") => name.trim().split(" ").filter(Boolean);

const normalizeClientFromApi = (client) => ({
  _id: client._id,
  source: "clients",
  clientId: client._id,
  firstName: client.firstName || "",
  lastName: client.lastName || "",
  email: client.email || "",
  telephone: client.telephone || "",
  date: client.date || null,
  dateOfBirth: client.date || null,
  createdAt: client.createdAt || null,
  imageUrl: client.imageUrl ? `${API_BASE_URL}${client.imageUrl}` : "",
});

const normalizeClientFromTransformation = (item) => {
  const nameParts = normalizeName(item.name || "");
  const firstName = nameParts[0] || item.clientId || "Client";
  const lastName = nameParts.slice(1).join(" ");

  return {
    _id: `transformation-${item._id}`,
    source: "transformations",
    transformationId: item._id,
    clientId: item.clientId || "",
    firstName,
    lastName,
    email: item.email || "",
    telephone: item.phone || "",
    date: item.dateOfBirth || null,
    dateOfBirth: item.dateOfBirth || null,
    createdAt: item.createdAt || null,
    imageUrl: item.imgBefore || "",
  };
};

const buildClientKey = (client) => {
  if (client.email) {
    return `email:${client.email.toLowerCase()}`;
  }
  if (client.telephone) {
    return `phone:${client.telephone}`;
  }
  if (client.clientId) {
    return `clientId:${client.clientId}`;
  }
  return `id:${client._id}`;
};

const mergeClients = (dbClients, transformationClients) => {
  const mergedMap = new Map();

  dbClients.forEach((client) => {
    mergedMap.set(buildClientKey(client), client);
  });

  transformationClients.forEach((client) => {
    const key = buildClientKey(client);
    const existing = mergedMap.get(key);

    if (!existing) {
      mergedMap.set(key, client);
      return;
    }

    // Prioriser les clients déjà enregistrés en base, mais compléter les champs manquants.
    mergedMap.set(key, {
      ...client,
      ...existing,
      email: existing.email || client.email,
      telephone: existing.telephone || client.telephone,
      date: existing.date || client.date,
      dateOfBirth: existing.dateOfBirth || client.dateOfBirth,
      imageUrl: existing.imageUrl || client.imageUrl,
    });
  });

  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  );
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour récupérer tous les clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const [clientsResponse, transformationsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/clients`),
        axios.get(`${API_BASE_URL}/api/transformations`),
      ]);

      const dbClients = clientsResponse.data?.success
        ? clientsResponse.data.data.map(normalizeClientFromApi)
        : [];

      const transformationClients = Array.isArray(transformationsResponse.data)
        ? transformationsResponse.data
            .filter((item) => item.name || item.phone || item.email)
            .map(normalizeClientFromTransformation)
        : [];

      const mergedClients = mergeClients(dbClients, transformationClients);
      setClients(mergedClients);

      if (!clientsResponse.data?.success) {
        toast.warning(
          "Clients DB indisponibles, affichage des données de transformation",
        );
      }
    } catch (error) {
      console.error("Erreur fetch clients:", error);
      setError("Impossible de charger les clients");
      toast.error("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ouvrir la modal avec l'image
  const openImageModal = (imageUrl, clientName) => {
    if (!imageUrl) {
      return;
    }
    setSelectedImage({ url: imageUrl, name: clientName });
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Fonction pour supprimer un client
  const deleteClient = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/clients/${id}`,
        );

        if (response.data.success) {
          toast.success("Client supprimé avec succès");
          fetchClients();
        } else {
          toast.error("Erreur lors de la suppression");
        }
      } catch (error) {
        console.error("Erreur suppression client:", error);
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  // Fermer la modal avec la touche ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeImageModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Charger les clients au montage du composant
  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchClients}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
            <h1 className="text-lg font-semibold text-gray-800">
              Gestion des Clients
            </h1>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {clients.length} client{clients.length !== 1 ? "s" : ""}
            </span>
          </div>

          {clients.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun client
              </h3>
              <p className="text-gray-500">
                Aucun client n'a été enregistré pour le moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto p-2">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 hidden md:table-header-group">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Picture
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Phone number
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Date of birthday
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Subscribe
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients.map((client) => (
                    <tr
                      key={client._id}
                      className="hover:bg-gray-50 block md:table-row"
                    >
                      <td className="px-4 sm:px-6 py-4 align-top">
                        <div
                          className={`inline-flex flex-col items-center transform transition-transform duration-200 ${
                            client.imageUrl
                              ? "cursor-pointer hover:scale-105"
                              : "cursor-default"
                          }`}
                          onClick={() =>
                            openImageModal(
                              client.imageUrl,
                              `${client.firstName} ${client.lastName}`,
                            )
                          }
                        >
                          <img
                            src={
                              client.imageUrl ||
                              "https://via.placeholder.com/48"
                            }
                            alt={`${client.firstName} ${client.lastName}`}
                            className="h-12 w-12 sm:h-11 sm:w-11 rounded-full object-cover border border-gray-200 hover:border-blue-400 shadow-sm"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                          <div className="text-[11px] text-blue-600 mt-1 text-center md:hidden">
                            👁️ Voir
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 md:py-4 whitespace-normal md:whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-800">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="md:hidden text-xs text-gray-500">
                          {client.email || "—"}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {client.email || "—"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 md:py-4 whitespace-normal md:whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {client.telephone || "—"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 md:py-4 whitespace-normal md:whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {client.date
                            ? new Date(client.date).toLocaleDateString("fr-FR")
                            : "—"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 md:py-4 whitespace-normal md:whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {client.createdAt
                            ? new Date(client.createdAt).toLocaleDateString(
                                "fr-FR",
                              )
                            : "—"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium">
                        {client.source === "clients" ? (
                          <button
                            onClick={() => deleteClient(client._id)}
                            className="text-red-600 hover:text-red-900 ml-0 md:ml-2 px-2 py-1 rounded-lg hover:bg-red-50"
                            title="Supprimer"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Depuis transformation
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal pour afficher l'image en grand */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Bouton fermer */}
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 z-10"
            >
              ✕
            </button>

            {/* Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Image+Non+Trouvée";
                }}
              />

              {/* Info client */}
              <div className="bg-gray-900 text-white p-4">
                <h3 className="text-base font-semibold">
                  {selectedImage.name}
                </h3>
                <p className="text-xs text-gray-300">
                  Cliquez n'importe où pour fermer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Clients;
