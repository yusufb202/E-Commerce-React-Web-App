import React from 'react';
import { categories } from '../data/categories';
import { Category } from '../types';

interface CategoryListProps {
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {categories.map((category) => (
        <div 
          key={category.id}
          onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
          className={`relative group cursor-pointer overflow-hidden rounded-lg ${
            selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-48 object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}