import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

/*
This is how you can use the Breadcrumb component:

 <Breadcrumb id="mainNav">
   <BreadcrumbItem href="/" id="home">Home</BreadcrumbItem>
   <BreadcrumbItem href="/products" id="products">Products</BreadcrumbItem>
   <BreadcrumbItem href="/products/electronics" id="electronics" isCurrent>Electronics</BreadcrumbItem>
 </Breadcrumb>
*/

export const Breadcrumb = ({ id, children }) => {
  const { getState, updateState } = useInputState();

  const { items = [] } = getState('breadcrumb', id) || {};

  React.useEffect(() => {
    const newItems = React.Children.toArray(children).map(child => ({
      id: child.props.id,
      href: child.props.href,
      label: child.props.children,
      isCurrent: child.props.isCurrent
    }));
    updateState('breadcrumb', id, { items: newItems });
  }, [id, children, updateState]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <BreadcrumbItem key={item.id} {...item} showIcon={index !== 0} />
        ))}
      </ol>
    </nav>
  );
};

export const BreadcrumbItem = ({ href, children, isCurrent = false, showIcon = true }) => {
  return (
    <li className="inline-flex items-center">
      {showIcon && <ChevronRightIcon className="w-5 h-5 text-gray-400" />}
      <a
        href={href}
        className={`ml-1 text-sm font-medium ${
          isCurrent ? 'text-gray-500 hover:text-gray-700' : 'text-blue-600 hover:text-blue-800'
        }`}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {children}
      </a>
    </li>
  );
};
