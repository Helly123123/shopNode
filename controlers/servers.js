let servers = [
    {
        "id": 1,
        "title": "Сплит-система Ballu",
        "model": "Ballu BBSGR-07HN1_22Y Greenland",
        "manufacturer": "Ballu",
        "square": 22,
        "price": 11000,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 2,
        "title": "Сплит-система Haier",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Haier",
        "square": 33,
        "price": 12000,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 3,
        "title": "Сплит-система Electrolux",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Electrolux",
        "square": 22,
        "price": 32900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 4,
        "title": "Сплит-система Dantex",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Dantex",
        "square": 22,
        "price": 71900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 5,
        "title": "Сплит-система JAX",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "JAX",
        "square": 22,
        "price": 26190,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 6,
        "title": "Сплит-система Lanzkraft",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Lanzkraft",
        "square": 22,
        "price": 29900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 7,
        "title": "Сплит-система LG",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "LG",
        "square": 22,
        "price": 11900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 8,
        "title": "Сплит-система Neoclima",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Neoclima",
        "square": 22,
        "price": 31900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 9,
        "title": "Сплит-система Oasis",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Oasis",
        "square": 22,
        "price": 24500,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 10,
        "title": "Сплит-система Rovex",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Rovex",
        "square": 22,
        "price": 22900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 11,
        "title": "Сплит-система Zanussi",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Zanussi",
        "square": 22,
        "price": 22900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 12,
        "title": "Сплит-система Бирюса",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Бирюса",
        "square": 22,
        "price": 27900,
        "img": "/slpit-sistem/ballu_one.svg"
    },
    {
        "id": 13,
        "title": "Сплит-система Ballu",
        "model": "Ballu BSGR-07HN1_22Y Greenland",
        "manufacturer": "Ballu",
        "square": 22,
        "price": 26000,
        "img": "/slpit-sistem/ballu_one.svg"
    }
]
    


export const getAll = (req, res) =>{
    res.status(200).json(servers)
}