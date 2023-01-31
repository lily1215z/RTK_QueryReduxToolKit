import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (build) => ({
        getGoods: build.query<ProductType[], string>({
            query: (limit='') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation<ProductType[], {name: string}>({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        deleteProduct: build.mutation<any, number>({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })
    })
})

export const {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} = goodsApi

//type
type ProductType = {
    id: number
    name: string
}