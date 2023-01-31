import React, {useState} from 'react';
import './App.css';
import {useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery} from './redux/goodsApi';

export function App() {
    const [count, setCount] = useState('')
    const [newProduct, setNewProduct] = useState('')

    const {data = [], isLoading} = useGetGoodsQuery(count)
    const [addProduct, {isError}] = useAddProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const handleAddProduct = async () => {
        if (newProduct) {
            await addProduct({name: newProduct}).unwrap()
            setNewProduct('')
        }
    }
    const handleDelete = async (id: number) => {
        await deleteProduct(id).unwrap()
    }

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error...</h1>

    return (
        <>
            <div>
                <input type="text" value={newProduct} onChange={e => setNewProduct(e.currentTarget.value)}/>
                <button onClick={handleAddProduct}>add product</button>
            </div>
            <div>
                <select value={count} onChange={e => setCount(e.target.value)}>
                    <option value="">all</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <ul className="App">
                {data.map((item: any) => (
                    <li key={item.id} onClick={() => handleDelete(item.id)}>{item.name}</li>
                ))}
            </ul>
        </>

    );
}

