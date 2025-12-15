'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import MenuItemCard from '@/components/shared/MenuItemCard'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Select from '@/components/shared/Select'
import FileUpload from '@/components/shared/FileUpload'
import Toggle from '@/components/shared/Toggle'
import { MenuItemCardSkeleton } from '@/components/shared/SkeletonLoader'
import { menuApi } from '@/lib/api-client'
import { MenuItem } from '@/types'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

const categories = [
  { value: 'Meals', label: 'Meals' },
  { value: 'Juices & Smoothies', label: 'Juices & Smoothies' },
  { value: 'Baked Goods', label: 'Baked Goods' },
  { value: 'Specialty Diets', label: 'Specialty Diets' },
  { value: 'Ethnic Cuisines', label: 'Ethnic Cuisines' },
  { value: 'Healthy/Wellness', label: 'Healthy/Wellness' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Prepared/Semi-Prepared', label: 'Prepared/Semi-Prepared' },
  { value: 'Catering', label: 'Catering' },
  { value: 'Meal Plans', label: 'Meal Plans' },
]

export default function MenuManagementPage() {
  const { currentUser } = useStore()
  const [activeCategory, setActiveCategory] = useState('Meals')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Meals',
    dietaryTags: [] as string[],
    photoUrl: '',
    isAvailable: true
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const { menuItems: fetchedItems } = await menuApi.getAll({ 
        chefId: currentUser?.id 
      })
      setMenuItems(fetchedItems)
    } catch (error: any) {
      toast.error('Failed to load menu items')
      console.error('Menu fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = menuItems.filter(item => item.category === activeCategory)

  const handleAddNew = () => {
    setEditingItem(null)
    setForm({
      name: '',
      description: '',
      price: '',
      category: activeCategory,
      dietaryTags: [],
      photoUrl: '',
      isAvailable: true
    })
    setShowModal(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      dietaryTags: item.dietaryTags,
      photoUrl: item.photoUrl,
      isAvailable: item.isAvailable
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)
    try {
      if (editingItem) {
        await menuApi.update(editingItem.id, {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          dietaryTags: form.dietaryTags,
          photoUrl: form.photoUrl,
          isAvailable: form.isAvailable
        })
        toast.success('Item updated!')
      } else {
        await menuApi.create({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          dietaryTags: form.dietaryTags,
          photoUrl: form.photoUrl,
          isAvailable: form.isAvailable
        })
        toast.success('Item added!')
      }
      
      setShowModal(false)
      fetchMenuItems()
    } catch (error) {
      toast.error('Failed to save menu item')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item: MenuItem) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    try {
      await menuApi.delete(item.id)
      toast.success('Item deleted')
      fetchMenuItems()
    } catch (error) {
      toast.error('Failed to delete item')
    }
  }

  const toggleDietaryTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      dietaryTags: prev.dietaryTags.includes(tag)
        ? prev.dietaryTags.filter(t => t !== tag)
        : [...prev.dietaryTags, tag]
    }))
  }

  return (
    <DashboardLayout userRole="chef" userName={currentUser?.name}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <Button onClick={handleAddNew}>
            + Add New Item
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-4 px-6 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`py-4 font-medium transition whitespace-nowrap ${
                    activeCategory === cat.value
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MenuItemCardSkeleton count={6} />
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    showActions
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No items in this category</h3>
                <p className="text-gray-600 mb-4">Add your first item to get started</p>
                <Button onClick={handleAddNew}>Add Item</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? 'Edit Menu Item' : 'Add New Item'}
        maxWidth="lg"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <Input
            label="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Chicken Mole Enchiladas"
            required
          />

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your dish..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="18.50"
              required
            />
            <Select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={categories}
              required
            />
          </div>

          <FileUpload
            label="Photo"
            onChange={(file) => console.log('File:', file)}
          />

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Tags</label>
            <div className="flex flex-wrap gap-2">
              {['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Paleo', 'Dairy-Free'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleDietaryTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    form.dietaryTags.includes(tag)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Toggle
            enabled={form.isAvailable}
            onChange={(val) => setForm({ ...form, isAvailable: val })}
            label="Available for ordering"
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}


