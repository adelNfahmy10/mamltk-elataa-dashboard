import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core'
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  type InMemoryScrollingFeature,
  type InMemoryScrollingOptions,
} from '@angular/router'
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { rootReducer } from './store'
import { localStorageSyncReducer } from '@store/layout/layout-reducers'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { CalendarEffects } from '@store/calendar/calendar.effects'
import { CookieService } from 'ngx-cookie-service'
import { AuthenticationEffects } from '@store/authentication/authentication.effects'
import { FakeBackendProvider } from '@core/helper/fake-backend'
import { provideToastr } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common'
import { headerInterceptor } from '@core/interceptors/header/header.interceptor'
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from '@core/interceptors/loading/loading.interceptor'
import { errorsInterceptor } from '@core/interceptors/errors/errors.interceptor'
import { provideAnimations } from '@angular/platform-browser/animations';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}

const inMemoryScrollingFeatures: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig)

export const appConfig: ApplicationConfig = {
  providers: [
    FakeBackendProvider,
    CookieService,
    DecimalPipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeatures, withHashLocation()),
    provideStore(rootReducer, { metaReducers: [localStorageSyncReducer] }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthenticationEffects, CalendarEffects),
    provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors([headerInterceptor, errorsInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
    provideToastr(),
    provideAnimations(),
  ],
}
