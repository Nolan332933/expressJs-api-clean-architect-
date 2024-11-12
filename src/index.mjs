import express from "express"

const app = express();

const mockUsers =[
    {id: 1, username:"anson", displayName: "Anson"},
    {id: 2, username:"nolan", displayName: "Nolan"},
    {id: 3, username:"carl", displayName: "Carl"},
]

app.get("/",(request, response)=> {
    response.status(201).send({msg: "hi"})
})

app.get("/api/users",(request, response)=> {
    console.log(request.query)
    const {query: {filter, value}} = request
    if(!filter && !value) return response.send(mockUsers)
})

app.get("/api/users/:id", (request, response) => {   
    const { filter, value } = request.query;
    if (!filter && !value) {
        return response.send(mockUsers);
    }

    const filteredUsers = mockUsers.filter(user => user[filter] && user[filter].includes(value));
    return response.send(filteredUsers);
})

app.get("/api/product", (request, response)=> {
    response.send([
        { id: 1, name: "ChickenBreast", price:"20bahts", expireDate: "22.02.2025"}
    ])
})



const PORT =  process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Running on PORT ${PORT}`)
})