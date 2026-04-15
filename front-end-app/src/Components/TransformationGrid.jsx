import React, { useState, useEffect } from 'react'
import { TransformationData } from '../mockData/data'
import axios from 'axios'

const TransformationGrid = () => {
  const [transformations, setTransformations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transformations')
        if (response.data && response.data.length > 0) {
          setTransformations(response.data)
        } else {
          setTransformations(TransformationData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des transformations:', error)
        setTransformations(TransformationData)
        setError('Impossible de charger les données depuis le serveur')
        setLoading(false)
      }
    }
    fetchTransformations()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-violet-300">
        <div className="w-5 h-5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
        <span>Chargement des transformations...</span>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="text-violet-400 text-center mb-4 text-sm">{error}</div>
      )}

      {/* Desktop View - 4 columns */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {transformations.slice(0, 10).map((item) => (
          <TransformationCard key={item.id || item._id} item={item} />
        ))}
      </div>

      {/* Mobile View - horizontal scroll */}
      <div className="md:hidden overflow-x-auto pb-4">
        <div className="flex space-x-4 w-max">
          {transformations.slice(0, 10).map((item) => (
            <div key={item.id || item._id} className="w-64 flex-shrink-0">
              <TransformationCard item={item} mobile />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const TransformationCard = ({ item, mobile = false }) => {
  return (
    <div className={`group glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-violet-700/30 transition-all duration-300 hover:-translate-y-1 ${mobile ? 'w-64' : 'w-full'}`}>
      <div className="flex">
        {/* Before Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={item.imgBefore}
            alt={`Before ${item.id || item.clientId}`}
            className={`w-full ${mobile ? 'h-48' : 'h-64'} object-cover transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2">
            <p className="text-white font-bold text-center text-xs tracking-widest">BEFORE</p>
          </div>
        </div>

        {/* After Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img
            src={item.imgAfter}
            alt={`After ${item.id || item.clientId}`}
            className={`w-full ${mobile ? 'h-48' : 'h-64'} object-cover transition-transform duration-500 group-hover:scale-105`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-violet-700/90 to-purple-700/90 backdrop-blur-sm p-2">
            <p className="text-white font-bold text-center text-xs tracking-widest">AFTER</p>
          </div>
        </div>
      </div>

      <div className="p-3 text-center">
        <p className="text-white font-medium">{item.clientId || `Client #${item.id}`}</p>
        <p className="text-violet-400 text-sm">{item.duration || "12 weeks"}</p>
      </div>
    </div>
  )
}

export default TransformationGrid