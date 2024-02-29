let servers = [
    {id: '1', title: 'ballu', price: 500},
    {id: '2', title: 'dantex', price: 600},
    {id: '3', title: 'jax', price: 100},
    {id: '4', title: 'бирюса', price: 700},
]


export const getAll = (req, res) =>{
    res.status(200).json(servers)
}