import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService)

  return next(req).pipe(catchError( (err)=>{
    _ToastrService.show(err.error.title, '', {
      toastClass: 'btn-light text-bg-danger px-3 py-2 mt-2 rounded-1',
      positionClass: 'toast-top-center',
    })
    return throwError(() => err);
  }))
};
