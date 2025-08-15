const apiGet = async (url: string) => {
    const response = await fetch(url);
    return response.json();
}

const apiPost = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const apiPut = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const apiDelete = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return response.json();
}

export { apiGet, apiPost, apiPut, apiDelete }