import { create } from 'zustand'

export const useWidgetStore = create((set) => ({
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: []
    }
  ],
  addCategory: (name) =>
    set((state) => ({
      categories: [...state.categories, { name, widgets: [] }]
    })),
  addWidget: (categoryName, widget) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      )
    })),
  removeWidget: (categoryName, widgetId) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.id !== widgetId)
            }
          : cat
      )
    }))
}))
