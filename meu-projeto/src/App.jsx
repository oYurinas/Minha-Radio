import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [stations, setStations] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("https://de1.api.radio-browser.info/json/stations");
        setStations(response.data.slice(0, 10)); // Pegando apenas 10 estações para evitar muita informação
      } catch (error) {
        console.error("Erro ao buscar as estações:", error);
      }
    };

    fetchStations();
  }, []);

  const handlePlay = (station) => {
    if (isPlaying === station.url_resolved) {
      setIsPlaying(null);
      return;
    }
    setIsPlaying(station.url_resolved);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Estações de Rádio Online</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => (
          <div
            key={station.id}
            className="card bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-white">{station.name || "Sem Nome"}</h2>
            <p className="text-sm text-gray-400 mb-4">
              País: {station.country || "Desconhecido"}
            </p>
            <button
              onClick={() => handlePlay(station)}
              className="button"
            >
              {isPlaying === station.url_resolved ? "Pausar" : "Ouvir"}
            </button>
            {isPlaying === station.url_resolved && (
              <audio autoPlay controls className="mt-4 w-full">
                <source src={station.url_resolved} type="audio/mpeg" />
                Seu navegador não suporta o player de áudio.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
