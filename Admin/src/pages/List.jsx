import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransformations();
  }, []);

  const fetchTransformations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transformations');
      setTransformations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des transformations:', error);
      setError('Impossible de charger les données');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette transformation?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/transformations/${id}`);
      // Mettre à jour la liste après suppression
      setTransformations(transformations.filter(item => item._id !== id));
      alert('Transformation supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-10 xl:px-28">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Liste des transformations</h2>
        <span className="text-xs text-gray-500">{transformations.length} élément(s)</span>
      </div>

      {transformations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">Aucune transformation trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {transformations.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="w-full">
                  <img 
                    src={item.imgBefore} 
                    alt={`Before ${item.clientId}`}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover object-center"
                  />
                </div>
                <div className="w-full">
                  <img 
                    src={item.imgAfter} 
                    alt={`After ${item.clientId}`}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover object-center"
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <p className="font-semibold text-gray-800 truncate" title={item.clientId}>{item.clientId}</p>
                  <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-600">{item.duration}</p>

                <div className="mt-3 flex justify-end">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;