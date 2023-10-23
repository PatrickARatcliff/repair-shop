import { BASE_URL } from './baseUrl';

export async function findAll(model: string) {
    // const config = {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${localStorage.getItem("RS_TOKEN")}`
    //     },
    // }

    const response = await fetch(`${BASE_URL}/${model}`);
    console.log(response);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`could not find all ${model}`)
}

export async function findById(model: string, id: number) {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("RS_TOKEN")}`
        },
    }

    const response = await fetch(`${BASE_URL}/${model}/${id}`, config);
    if (response.ok) {
        return response.json();
    }
    if (response.status === 404) {
        return null;
    }
    return Promise.reject(`could not find ${model} id ${id}`);
}

async function sendBody(instance: Object, method: string, theUrl: string) {

    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("RS_TOKEN")}`
        },
        body: JSON.stringify(instance)
    }

    // try {
        const response = await fetch(theUrl, config);
        console.log(`sendBody: ${response}`);

        if(!response || response === null) {
            console.log('sendBody: no response');
            return null;
        }

        if (response.status === 204) {
            console.log("sendBody: 204")
            return null;
        }

        if (response.status === 201) {
            console.log("sendBody: 200")
            return response.json();
        }

        if (response.status === 400) {
            const errors = await response.json();
            return errors;
        }

    // } catch {
    //     console.error("Error in SendBody response")
    //     return Promise.reject();
    // }


    return Promise.reject();
}

export async function save(model: string, instance: Object, id: number) {
    if (id) {
        console.log(`save: put`);
        return sendBody(instance, "PUT", `${BASE_URL}/${model}/${id}`);
    } else {
        console.log(`save: post`);
        return sendBody(instance, "POST", `${BASE_URL}/${model}`);
    }
}

export async function deleteById(model: string, id: number) {

    const config = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("RS_TOKEN")}`
        },
    }

    const response = await fetch(`${BASE_URL}/${model}/${id}`, config);
    if (response.ok) {
        return;
    }
    return Promise.reject(`Could not delete ${model} with id ${id}.`)
}