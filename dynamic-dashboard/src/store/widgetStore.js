import { create } from 'zustand'
import { nanoid } from 'nanoid'

export const useWidgetStore = create((set) => ({
  categories: [
    { name: 'CSPM Executive Dashboard', widgets: [] },
    { name: 'Registry Score', widgets: [] },
    { name: 'CAASM Assessment', widgets: [] },
    { name: 'Environment Status', widgets: [] },
  ],
  widgets: [],

  addWidget: (categoryName, widget) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? { ...cat, widgets: [...cat.widgets, { ...widget, id: nanoid() }] }
          : cat
      ),
      widgets: [...state.widgets, { ...widget, id: nanoid() }],
    })),

  removeWidget: (categoryName, widgetId) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.name === categoryName
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.id !== widgetId),
            }
          : cat
      ),
      widgets: state.widgets.filter((w) => w.id !== widgetId),
    })),
}))
