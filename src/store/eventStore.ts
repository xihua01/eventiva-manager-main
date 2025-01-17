import { create } from 'zustand';
import { Event } from '../types/event';

type EventStore = {
  events: Event[];
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  fetchEvents: async () => {
    const response = await fetch('http://localhost/eventiva-manager-main/event_api.php');
    const events = await response.json();
    set({ events });
  },
  addEvent: async (event) => {
    const newEvent = { ...event, id: crypto.randomUUID() };
    await fetch('http://localhost/eventiva-manager-main/event_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'add', ...newEvent }),
    });
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  updateEvent: async (id, updatedEvent) => {
    await fetch('http://localhost/eventiva-manager-main/event_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'update', id, ...updatedEvent }),
    });
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    }));
  },
  deleteEvent: async (id) => {
    await fetch('http://localhost/eventiva-manager-main/event_api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'delete', id }),
    });
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    }));
  },
}));