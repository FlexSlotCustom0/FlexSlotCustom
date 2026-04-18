const API_BASE_URL = "http://localhost:8000";

export const api = {
  async getTenants() {
    const res = await fetch(`${API_BASE_URL}/tenants`);
    if (!res.ok) throw new Error("Failed to fetch tenants");
    return res.json();
  },

  async getServicesBySlug(slug: string) {
    const res = await fetch(`${API_BASE_URL}/tenants/${slug}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },

  async getBookings() {
    const res = await fetch(`${API_BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },

  async createBooking(bookingData: any) {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Failed to create booking");
    return res.json();
  },

  async deleteBooking(id: number | string) {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete booking");
    return res.json();
  },
};
