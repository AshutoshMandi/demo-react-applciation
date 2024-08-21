import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                debugger;
                const response1 = await fetch('/assets/branch1.json');
                const data1 = await response1.json();

                const response2 = await fetch('/assets/branch2.json');
                const data2 = await response2.json();

                const response3 = await fetch('/assets/branch3.json');
                const data3 = await response3.json();

                // Merge product data from all branches
                const mergedProducts = [   
                    ...data1.products,
                    ...data2.products,
                    ...data3.products,];
                    
                    const productMap = new Map();
                    mergedProducts.forEach(product => productMap.set(product.id, product));
    
                    // Convert Map values to array
                    
                    const uniqueProducts = Array.from(productMap.values());
                    uniqueProducts.sort((a, b) => a.name.localeCompare(b.name));
                setProducts(uniqueProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(
        product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRevenue = filteredProducts.reduce((total, product) => 
        total + (product.unitPrice * product.sold), 0
    ).toFixed(2);
    
    return (
        <div className="table-container">
            <h2>Product Information</h2>
            <input
                type="text"
                placeholder="Search by name or product ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="styled-table">
                <thead>
                    <tr>
                        {/* <th>Product ID</th> */}
                        <th>Name</th>
                        {/* <th>Unit Price</th>
                        <th>Sold</th> */}
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            {/* <td>{product.id}</td> */}
                            <td>{product.name}</td>
                            {/* <td>${product.unitPrice.toFixed(2)}</td>
                            <td>{product.sold}</td> */}
                            <td>${(product.unitPrice * product.sold).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-revenue">
                <h3>Total Revenue: ${totalRevenue}</h3>
            </div>

        </div>
    );
};

export default Table;
