import type { Route } from '@angular/router'
import { InboxComponent } from './apps/inbox/inbox.component'
import { MessagesComponent } from './apps/messages/messages.component'
import { OrdersComponent } from './apps/orders/orders.component'
import { ReviewsComponent } from './apps/reviews/reviews.component'
import { TransactionsComponent } from './apps/transactions/transactions.component'
import { WidgetsComponent } from './apps/widgets/widgets.component'
import { SumouProjectsComponent } from './apps/sumou-projects/sumou-projects.component'
import { SumouAboutComponent } from './apps/sumou-about/sumou-about.component'
import { SumouContractingComponent } from './apps/sumou-contracting/sumou-contracting.component'
import { SumouConfigurationComponent } from './apps/sumou-configuration/sumou-configuration.component'
import { SumouContactComponent } from './apps/sumou-contact/sumou-contact.component'
import { SumouPreviousInvestmentsComponent } from './apps/sumou-previous-investments/sumou-previous-investments.component'
import { SumouBookComponent } from './apps/sumou-book/sumou-book.component'

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./dashboards/dashboard.route').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'property',
    loadChildren: () =>
      import('./property/property.route').then((mod) => mod.PROPERTY_ROUTES),
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('./agents/agents.route').then((mod) => mod.AGENT_ROUTES),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.route').then((mod) => mod.CUSTOMER_ROUTES),
  },
  {
    path: 'projects',
    component: SumouProjectsComponent,
    data: { title: 'Projects' },
  },
  {
    path: 'previous-projects',
    component: SumouPreviousInvestmentsComponent,
    data: { title: 'Previous Investments' },
  },
  {
    path: 'about',
    component: SumouAboutComponent,
    data: { title: 'About' },
  },
  {
    path: 'contracting',
    component: SumouContractingComponent,
    data: { title: 'Contracting' },
  },
  {
    path: 'contact',
    component: SumouContactComponent,
    data: { title: 'Contact' },
  },
  {
    path: 'configuration',
    component: SumouConfigurationComponent,
    data: { title: 'Configuration' },
  },
  {
    path: 'book',
    component: SumouBookComponent,
    data: { title: 'Books' },
  },
  {
    path: 'order',
    component: OrdersComponent,
    data: { title: 'Orders' },
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { title: 'Transactions' },
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    data: { title: 'Reviews' },
  },
  {
    path: 'messages',
    component: MessagesComponent,
    data: { title: 'Messages' },
  },
  {
    path: 'inbox',
    component: InboxComponent,
    data: { title: 'Inbox' },
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.route').then((mod) => mod.POST_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: 'widgets',
    component: WidgetsComponent,
    data: { title: 'Widgets' },
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES),
  },
  {
    path: 'extended',
    loadChildren: () =>
      import('./extended/extended.route').then((mod) => mod.EXTENDED_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.route').then((mod) => mod.CHART_ROUTES),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/table.route').then((mod) => mod.TABLE_ROUTES),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES),
  },
]
