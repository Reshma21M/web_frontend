import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { cake_list } from "../components/assets/assets";
import './AdminView.css';

const AdminView = () => {
  const { userData, setIsLoggedIn, setUserData } = useContext(AppContext);
  const [cakes, setCakes] = useState(cake_list);
  const [newCake, setNewCake] = useState({ name: '', price: '', category: 'Cakes', image: null, imagePreview: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', category: '', image: '', imagePreview: '' });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/login';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCake({
        ...newCake,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddCake = (e) => {
    e.preventDefault();
    const newId = (cakes.length + 1).toString();

    const newItem = {
      id: newId,
      name: newCake.name,
      image: newCake.imagePreview || '', 
      price: parseFloat(newCake.price),
      description: 'Custom cake item',
      category: newCake.category,
    };
    setCakes([...cakes, newItem]);
    setNewCake({ name: '', price: '', category: 'Cakes', image: null, imagePreview: '' });
  };

  const handleDelete = (id) => {
    setCakes(cakes.filter(c => c.id !== id));
  };

  const startEditing = (cake) => {
    setEditingId(cake.id);
    setEditForm({
      name: cake.name,
      price: cake.price,
      category: cake.category,
      image: cake.image,
      imagePreview: cake.image,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: '', price: '', category: '', image: '', imagePreview: '' });
  };

  const saveEditing = (id) => {
    setCakes(cakes.map(cake => 
      cake.id === id 
        ? { ...cake, name: editForm.name, price: parseFloat(editForm.price), category: editForm.category, image: editForm.imagePreview } 
        : cake
    ));
    cancelEditing();
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({
        ...editForm,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="admin-view">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <h2>Add Cake Item</h2>
      <form onSubmit={handleAddCake} className="cake-form">
        <input
          type="text"
          placeholder="Cake Name"
          value={newCake.name}
          onChange={(e) => setNewCake({ ...newCake, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newCake.price}
          onChange={(e) => setNewCake({ ...newCake, price: e.target.value })}
          required
        />
        <select
          value={newCake.category}
          onChange={(e) => setNewCake({ ...newCake, category: e.target.value })}
        >
          <option value="Cakes">Cakes</option>
          <option value="Celebration Cakes">Celebration Cakes</option>
          <option value="Cup Cakes">Cup Cakes</option>
          <option value="Roll Cakes">Roll Cakes</option>
          <option value="Dessert Cakes">Dessert Cakes</option>
          <option value="Bento Cakes">Bento Cakes</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newCake.imagePreview && (
          <img 
            src={newCake.imagePreview} 
            alt="Preview" 
            className="preview-image"
          />
        )}

        <button type="submit">Add Cake</button>
      </form>

      <h2>All Cake Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name & Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map(cake => (
            <tr key={cake.id}>
              <td>
                {cake.image ? (
                  <img 
                    src={cake.image} 
                    alt={cake.name} 
                    className="cake-image"
                  />
                ) : (
                  <div className="no-image-placeholder">
                    No Image
                  </div>
                )}
                {editingId === cake.id ? (
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                  />
                ) : (
                  cake.name
                )}
              </td>

              <td>
                {editingId === cake.id ? (
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Celebration Cakes">Celebration Cakes</option>
                    <option value="Cup Cakes">Cup Cakes</option>
                    <option value="Roll Cakes">Roll Cakes</option>
                    <option value="Dessert Cakes">Dessert Cakes</option>
                    <option value="Bento Cakes">Bento Cakes</option>
                  </select>
                ) : (
                  cake.category
                )}
              </td>

              <td>
                {editingId === cake.id ? (
                  <input 
                    type="number" 
                    value={editForm.price} 
                    onChange={e => setEditForm({ ...editForm, price: e.target.value })} 
                  />
                ) : (
                  `Rs. ${cake.price}`
                )}
              </td>

              <td>
                {editingId === cake.id ? (
                  <>
                    <input type="file" accept="image/*" onChange={handleEditImageChange} />
                    {editForm.imagePreview && (
                      <img 
                        src={editForm.imagePreview} 
                        alt="Edit Preview" 
                        className="edit-image-preview"
                      />
                    )}
                    <br />
                    <button onClick={() => saveEditing(cake.id)}>Save</button>
                    <button onClick={cancelEditing} style={{ marginLeft: '8px' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(cake)}>Edit</button>
                    <button onClick={() => handleDelete(cake.id)} style={{ marginLeft: '8px' }}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
