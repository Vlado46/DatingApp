import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const leadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  const generateCacheKey = (url: string, params: HttpParams): string => {
    const paramsString = params
      .keys()
      .map((key) => `${key}=${params.get(key)}`)
      .join('&');
    return paramsString ? `${url}?${paramsString}` : url;
  };

  const invalidateCache = (urlPattern: string) => {
    for (const key of cache.keys()) {
      if (key.includes(urlPattern)) {
        cache.delete(key);
        console.log(`Cache invalidated for key: ${key}`);
      }
    }
  };

  const cacheKey = generateCacheKey(req.url, req.params);

  if (req.method === 'POST' && req.url.includes('/likes')) {
    invalidateCache('/likes');
  }

  if (req.method === 'GET') {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500),
    tap((res) => {
      cache.set(cacheKey, res);
    }),
    finalize(() => {
      busyService.idle();
    })
  );
};
