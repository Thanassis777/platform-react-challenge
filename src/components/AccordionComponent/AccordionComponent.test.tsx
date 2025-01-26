import { fireEvent, render } from '@testing-library/react';
import AccordionComponent, { AccordionItem } from './AccordionComponent';

const mockItems: AccordionItem[] = [
  { eventKey: '0', title: 'Title 1', content: 'Content 1' },
  { eventKey: '1', title: 'Title 2', content: 'Content 2' },
];

const setup = (props = {}) => {
  const defaultProps = { items: mockItems, defaultActiveKey: '0' };
  return render(<AccordionComponent {...defaultProps} {...props} />);
};

describe('AccordionComponent', () => {
  it('renders all items correctly', () => {
    // Arrange
    const { getAllByRole } = setup();

    // Act
    const titles = getAllByRole('button', { name: /Title/i });

    // Assert
    expect(titles).toHaveLength(2);
    expect(titles[0]).toHaveTextContent('Title 1');
    expect(titles[1]).toHaveTextContent('Title 2');
  });

  it('displays content for the default active item', () => {
    // Arrange
    const { getByText } = setup();

    // Act
    const content = getByText('Content 1');

    // Assert
    expect(content).toBeInTheDocument();
  });

  it('displays no items message when items array is empty', () => {
    // Arrange
    const { getByText } = setup({ items: [] });

    // Act
    const noItemsMessage = getByText('No items to display');

    // Assert
    expect(noItemsMessage).toBeInTheDocument();
  });

  it('toggles content visibility on header click', () => {
    // Arrange
    const { getByRole, getByText } = setup();

    // Act
    const title = getByRole('button', { name: /Title 2/i });
    fireEvent.click(title);

    // Assert
    expect(getByText('Content 2')).toBeInTheDocument();
  });
});
