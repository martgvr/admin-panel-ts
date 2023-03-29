# Firebase Data structure

## Products

```
id {
    category: string,
    type: string,
    name: string,
    photo: string,
    price: number,
    stock: number,
    timestamp: string
}
```

## Orders

```
id {
    customer: string (email),
    products: array,
    status: 'delivered' | 'undelivered'
}
```

## Customers

```
id {
    email: string,
    fullname: string,
    password: string,
    areacode: number,
    telephone: number,
    address: string,
    avatar: string,
    cart: array
}
```