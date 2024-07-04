import React, { useEffect, useState } from "react";

function Pokemon() {
  const [errors, setErrors] = useState(null);
  const [pokemon, setPokemon] = useState("");
  const [pokemonUrl, setPokemonUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const random = () => {
    return Math.floor(Math.random() * 500);
  };

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${random()}`
      );
      const data = await response.json();
      setPokemonUrl(data.sprites.front_default);
      setPokemon(data.species.name);
      setLoading(false);
    } catch (error) {
      setErrors(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6em"
          height="6em"
          viewBox="0 0 24 24"
        >
          <g stroke="currentColor">
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              strokeLinecap="round"
              strokeWidth="3"
            >
              <animate
                attributeName="stroke-dasharray"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0 150;42 150;42 150;42 150"
              ></animate>
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0;-16;-59;-59"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            ></animateTransform>
          </g>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex justify-center h-[100vh] items-center">
      {errors ? (
        <p className="text-red-500">{errors}</p>
      ) : (
        <div className="text-center">
          <p className="text-green-400 font-bold">{pokemon}</p>
          <img
            alt="pokemon img"
            src={pokemonUrl}
            width={100}
            height={100}
          ></img>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
