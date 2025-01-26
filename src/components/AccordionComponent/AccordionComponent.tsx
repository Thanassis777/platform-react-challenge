import { FC, ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';

export interface AccordionItem {
  eventKey: string;
  title: string;
  content: ReactNode;
}

interface AccordionComponentProps {
  items: AccordionItem[];
  defaultActiveKey?: string;
}

/**
 * @component
 * A reusable accordion component which renders a list of items that collapse
 * @param items - Array of accordion items to display.
 * @param defaultActiveKey - The event key of the item that is open by default.
 */
const AccordionComponent: FC<AccordionComponentProps> = ({ items, defaultActiveKey = '0' }) => {
  if (!items || items.length === 0) {
    return <p>No items to display</p>;
  }

  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      {items.map((item) => (
        <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>{item.content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
