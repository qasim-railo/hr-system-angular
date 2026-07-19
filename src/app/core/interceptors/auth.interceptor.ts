import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};
