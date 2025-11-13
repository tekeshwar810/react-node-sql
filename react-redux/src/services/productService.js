import api from './api'

// Product service: attempts an API call, falls back to localStorage when offline.
const STORAGE_KEY = 'mock_products_v1'

function fallbackList() {
  const raw = localStorage.getItem(STORAGE_KEY) || '[]'
  return JSON.parse(raw)
}

function fallbackSave(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function listProducts() {
  try {
    const res = await api.get('/products')
    return res.data
  } catch (err) {
    console.log(err);
    if (err.status === 401) {
      return { success: false, message: "Unauthorized" }
    }
    return { success: false, message: "Product listing failed" }
  }
}

export async function createProduct(payload) {
  try {
    const res = await api.post('/products', payload)
    return res
  } catch (err) {
    alert(err?.response?.data.message || 'Product creation failed')
  }
}

export async function updateProduct(id, payload) {
  try {
    const res = await api.patch(`/products/${id}`, payload)
    return res.data
  } catch (err) {
    const list = fallbackList()
    const idx = list.findIndex((p) => p.id === id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...payload }
      fallbackSave(list)
      return list[idx]
    }
    throw new Error('Product not found')
  }
}

export async function deleteProduct(id) {
  try {
    await api.delete(`/products/${id}`)
    return { success: true }
  } catch (err) {
    const list = fallbackList()
    const newList = list.filter((p) => p.id !== id)
    fallbackSave(newList)
    return { success: true }
  }
}

export async function getProduct(id) {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch (err) {
    const list = fallbackList()
    return list.find((p) => p.id === id)
  }
}
