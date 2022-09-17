import Dropdown from 'react-bootstrap/Dropdown';

function AdminDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Add Product</Dropdown.Item>
        <Dropdown.Item href="#/action-2">List Product</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AdminDropdown;