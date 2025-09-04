import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  forwardRef,
  ReactElement,
  Children,
  isValidElement,
  cloneElement,
} from 'react';

// Context to manage active accordion items
interface AccordionContextType {
  activeItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

// Accordion item properties
interface AccordionItemProps {
  children: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
  value: string;
  className?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, ...props }, ref) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error('AccordionItem must be used within an Accordion');

    const { activeItems, toggleItem } = context;
    const isOpen = activeItems.includes(value);

    const handleToggle = useCallback(() => toggleItem(value), [toggleItem, value]);

    // Memoize children rendering
    const renderedChildren = useMemo(() => {
      const renderChildren = (children: AccordionItemProps['children']): React.ReactNode => {
        if (typeof children === 'function') {
          return children({ isOpen });
        }

        return Children.map(children, (child) => {
          if (isValidElement(child)) {
            const propsWithIsOpen = { ...child.props, isOpen };

            if (child.type === AccordionTrigger) {
              return cloneElement<AccordionTriggerProps>(
                child as ReactElement<AccordionTriggerProps>,
                {
                  ...propsWithIsOpen,
                  onClick: handleToggle,
                }
              );
            }

            if (child.type === AccordionContent) {
              return cloneElement<AccordionContentProps>(
                child as ReactElement<AccordionContentProps>,
                propsWithIsOpen
              );
            }

            if (child.type === AccordionItem) {
              return cloneElement<AccordionItemProps>(
                child as ReactElement<AccordionItemProps>,
                {
                  ...propsWithIsOpen,
                  children: renderChildren(child.props.children),
                }
              );
            }
          }
          return child;
        });
      };

      return renderChildren(children);
    }, [children, isOpen, handleToggle]);

    return (
      <div ref={ref} {...props}>
        {renderedChildren}
      </div>
    );
  }
);

// Accordion trigger properties
interface AccordionTriggerProps {
  children: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, onClick, isOpen, ...props }, ref) => (
    <button
      ref={ref}
      className={`w-full text-left font-semibold focus:outline-none ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      }}
      type="button"
      {...props}
    >
      {typeof children === 'function' ? children({ isOpen: isOpen || false }) : children}
    </button>
  )
);

// Accordion content properties
interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, isOpen, ...props }, ref) => (
    <div
      ref={ref}
      className={`${className} ${isOpen ? '' : 'hidden'}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
);

// Accordion properties
interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  children: ReactNode;
}

// Accordion component with static subcomponents
interface AccordionComponent extends React.FC<AccordionProps> {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
}

const Accordion: AccordionComponent = ({
  type = 'single',
  collapsible = true,
  children,
}) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const toggleItem = useCallback((value: string) => {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(value)) {
        return collapsible ? prevActiveItems.filter((item) => item !== value) : prevActiveItems;
      } else {
        return type === 'single' ? [value] : [...prevActiveItems, value];
      }
    });
  }, [type, collapsible]);

  const contextValue = useMemo(() => ({ activeItems, toggleItem }), [activeItems, toggleItem]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};

// Assign subcomponents to Accordion
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };