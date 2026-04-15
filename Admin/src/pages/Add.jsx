// ... existing code ...

import { useState, useRef } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';

const Add = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [clientId, setClientId] = useState('');
  const [duration, setDuration] = useState('12 weeks');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const beforeImageInputRef = useRef(null);
  const afterImageInputRef = useRef(null);

  const handleBeforeImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAfterImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (isResult = false) => {
    if (isResult) {
      afterImageInputRef.current.click();
    } else {
      beforeImageInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage || !previewImage || !clientId) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/transformations', {
        clientId,
        imgBefore: selectedImage,
        imgAfter: previewImage,
        duration,
        name,
        phone,
        email,
        dateOfBirth
      });
      
      if (response.status === 201) {
        alert('Transformation ajoutée avec succès!');
        // Réinitialiser le formulaire
        setSelectedImage(null);
        setPreviewImage(null);
        setClientId('');
        setDuration('12 weeks');
        setName('');
        setPhone('');
        setEmail('');
        setDateOfBirth('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur lors de l\'ajout de la transformation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 py-6'>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-800">Add Transformation</h2>
          <span className="text-xs text-gray-500">Formulaire</span>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
              <input 
                type="text" 
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                placeholder="Ex: Client #123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="4 weeks">4 weeks</option>
                <option value="8 weeks">8 weeks</option>
                <option value="12 weeks">12 weeks</option>
                <option value="16 weeks">16 weeks</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                placeholder="Ex: John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                placeholder="Ex: +213..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                placeholder="Ex: mail@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input 
                type="date" 
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {/* Zone d'upload source */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 min-h-[220px] sm:min-h-[240px] transition-colors"
              onClick={() => triggerFileInput(false)}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded content" className="max-h-44 sm:max-h-48 mb-3 rounded-lg shadow" />
              ) : (
                <img src={assets.upload_area} alt="Upload" className="w-24 h-24 mb-3 opacity-70" />
              )}
              <p className="text-center text-gray-500 text-sm">
                {selectedImage ? 'Cliquer pour changer' : 'Cliquer pour uploader'}
              </p>
            </div>

            {/* Zone de prévisualisation */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 min-h-[220px] sm:min-h-[240px] transition-colors"
              onClick={() => triggerFileInput(true)}
            >
              {previewImage ? (
                <img src={previewImage} alt="Result preview" className="max-h-44 sm:max-h-48 mb-3 rounded-lg shadow" />
              ) : (
                <img src={assets.upload_area} alt="Result" className="w-24 h-24 mb-3 opacity-70" />
              )}
              <p className="text-center text-gray-500 text-sm">
                {previewImage ? 'Cliquer pour changer' : 'Cliquer pour uploader le résultat'}
              </p>
            </div>
          </div>

          {/* Inputs fichier cachés - un pour chaque image */}
          <input
            type="file"
            ref={beforeImageInputRef}
            onChange={handleBeforeImageUpload}
            className="hidden"
            accept="image/*"
          />
          <input
            type="file"
            ref={afterImageInputRef}
            onChange={handleAfterImageUpload}
            className="hidden"
            accept="image/*"
          />

          <div className="mt-6 sm:mt-8">
            <button 
              type="submit" 
              className='w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Add Transformation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;