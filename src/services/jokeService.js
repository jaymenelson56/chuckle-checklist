export const postJoke = async (newJoke) => {
    try {
        const response = await fetch('http://localhost:8088/jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJoke),
        })
        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('Failed to post joke')
        }

    } catch (error) {
        console.error('Error posting joke', error)
    }


}

export const getJokes = async () => {
    try {
        const response = await fetch('http://localhost:8088/jokes')
        if (!response.ok) {
            throw new Error('Failed to fetch jokes')
        }
        const jokesData = await response.json()
        return jokesData
    } catch (error) {
        console.error('Error fetching jokes:', error)
        throw error
    }
}

export const editJoke = async (jokeId, editedJoke) => {
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedJoke),
    })
}

export const deleteJoke = async(jokeId) => {
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, {
    method: 'DELETE', 
})
}