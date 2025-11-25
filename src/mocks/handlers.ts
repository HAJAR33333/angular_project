/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products } from './data';
import { paginate, avgRating } from './utils';

const API = '/api';

export const handlers = [
  // Auth: POST /api/auth/token/ -> { access, refresh }
  http.post(`${API}/auth/token/`, async () => {
    // Ici on accepte tout payload pour valider l'intégration front.
    return HttpResponse.json(
      {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      },
      { status: 200 },
    );
  }),

  // Auth refresh: POST /api/auth/token/refresh/ -> { access }
  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json({ access: 'mock-access-token-refreshed' }, { status: 200 });
  }),

  // Products list: GET /api/products/?page=&page_size=&min_rating=&ordering=
  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    const sign = ordering.startsWith('-') ? -1 : 1;
    const key = ordering.replace(/^-/, '');
    rows.sort((a: any, b: any) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign);

    const { count, results } = paginate(rows, page, page_size);
    return HttpResponse.json({ count, next: null, previous: null, results }, { status: 200 });
  }),

  // Product rating: GET /api/products/:id/rating/
  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(
      { product_id: id, avg_rating: avgRating(p.ratings), count: p.ratings.length },
      { status: 200 },
    );
  }),
  // --- GET /api/products/:id/  -> full product details
http.get(`${API}/products/:id/`, async ({ params }) => {
  const id = Number(params['id']);
  const p = products.find((x) => x.id === id);
  if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
  return HttpResponse.json(p, { status: 200 });
}),


// --- POST /api/cart/validate/  -> return summary price
http.post(`${API}/cart/validate/`, async ({ request }) => {
const body = (await request.json()) as { items: { id: number; qty: number }[] };

  if (!body?.items || !Array.isArray(body.items)) {
    return HttpResponse.json(
      { detail: 'Invalid payload' },
      { status: 400 },
    );
  }

  let total = 0;

  body.items.forEach((item: { id: number; qty: number }) => {
    const product = products.find((p) => p.id === item.id);
    if (product) total += product.price * item.qty;
  });

  return HttpResponse.json(
    {
      success: true,
      summary: {
        total,
        currency: 'EUR',
        delivery: total > 500 ? 0 : 12.5,
      },
    },
    { status: 200 },
  );
}),


// --- POST /api/order/  -> generate fake order confirmation
http.post(`${API}/order/`, async ({ request }) => {
const body = (await request.json()) as { cart: { id: number; qty: number ; price: number }[] };

  if (!body?.cart || !Array.isArray(body.cart)) {
    return HttpResponse.json(
      { detail: 'Invalid order payload' },
      { status: 400 },
    );
  }

  const orderId = Math.floor(Math.random() * 900000) + 100000;

  return HttpResponse.json(
    {
      success: true,
      order_id: orderId,
      message: 'Order has been successfully placed.',
    },
    { status: 200 },
  );
}),

];
