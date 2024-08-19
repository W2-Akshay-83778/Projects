import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryManagement.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState({ id: null, name: '' });

    useEffect(() => {
        // Fetch categories from API
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/foodcategories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('http://localhost:8080/foodcategories', {
                categoryName: newCategory
            });
            setCategories([...categories, response.data]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/foodcategories/${editCategory.id}`, {
                categoryName: editCategory.name
            });
            const updatedCategories = categories.map(category =>
                category.categoryID === editCategory.id ? response.data : category
            );
            setCategories(updatedCategories);
            setEditCategory({ id: null, name: '' });
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/foodcategories/${id}`);
            const updatedCategories = categories.filter(category => category.categoryID !== id);
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="category-management">
            <h1>Category Management</h1>
            <div className="category-form">
                <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="New Category Name"
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
            {editCategory.id && (
                <div className="category-form">
                    <input
                        type="text"
                        value={editCategory.name}
                        onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
                        placeholder="Edit Category Name"
                    />
                    <button onClick={handleUpdateCategory}>Update Category</button>
                </div>
            )}
            <ul>
                {categories.map(category => (
                    <li key={category.categoryID}>
                        {category.categoryName}
                        <button onClick={() => setEditCategory({ id: category.categoryID, name: category.categoryName })}>
                            Edit
                        </button>
                        <button onClick={() => handleDeleteCategory(category.categoryID)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManagement;
