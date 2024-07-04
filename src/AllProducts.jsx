import React, { useEffect, useState } from 'react'

function AllProducts() {
    const [errors, setErrors] = useState(null)
    const [pokemon, setPokemon] = useState('')
    const [pokemonUrl, setPokemonUrl] = useState('')

    const random =()=>{
        return Math.floor(Math.random() * 500);
    }

    const fetchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random()}`)
            const data = await response.json()
            setPokemonUrl(data.sprites.front_default)
            setPokemon(data.species.name)
        } catch (error) {
            setErrors(error.message)
        }
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <div className='flex justify-center h-[100vh] items-center'>
            {errors ? (
                <p className='text-red-500'>{errors}</p>
            ) : (
                <div className='text-center' >
                <p className='text-green-400 font-bold'>{pokemon}</p>
                <img  alt='pokemon img' src={pokemonUrl} width={100} height={100}></img>
            </div>)}
        </div>
    )
}

export default AllProducts
