import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/categories', { name });
    setName('');
    fetchCategories();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Category Manager</h1>

      <form onSubmit={handleSubmit} className="flex space-x-4 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Add Category
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c._id} className="border p-3 rounded">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
