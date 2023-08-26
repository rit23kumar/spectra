import React from 'react'
import Index from '../views/dashboard/index'

import Default from '../layouts/dashboard/default';
import ProductCategory from '../views/business-pages/product-category';
import Items from '../views/business-pages/items';
import Customer from '../views/business-pages/customer';
import SalesOrder from '../views/business-pages/sales-order';
import PaymentReceived from '../views/business-pages/payment-received';
import PurchaseOrder from '../views/business-pages/purchase-order';
import PaymentMade from '../views/business-pages/payment-made';
import ExpCategory from '../views/business-pages/ex-category';
import ExpCreate from '../views/business-pages/ex-create';
import Employee from '../views/business-pages/employee';
import Timesheet from '../views/business-pages/timesheet';
import Payroll from '../views/business-pages/payroll';
import Earning from '../views/business-pages/earning';
import Supplier from '../views/business-pages/supplier';


export const DefaultRouter = [
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: 'dashboard',
                element: <Index />
            },
            {
                path: '/product-category',
                element: <ProductCategory />
            },
            {
                path: '/items',
                element: <Items />
            },
            {
                path: '/customer',
                element: <Customer />
            },
            {
                path: '/sales-order',
                element: <SalesOrder />
            },
            {
                path: '/payment-received',
                element: <PaymentReceived />
            },
            {
                path: '/supplier',
                element: <Supplier />
            },
            {
                path: '/purchase-order',
                element: <PurchaseOrder />
            },
            {
                path: '/payment-made',
                element: <PaymentMade />
            },
            {
                path: '/earning',
                element: <Earning />
            },
            {
                path: '/ex-category',
                element: <ExpCategory />
            },
            {
                path: '/ex-create',
                element: <ExpCreate />
            },
            {
                path: '/employee',
                element: <Employee />
            },
            {
                path: '/timesheet',
                element: <Timesheet />
            },
            {
                path: '/payroll',
                element: <Payroll />
            }
        ]
    }
]

