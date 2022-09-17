import Dropdown from 'react-bootstrap/Dropdown';

function KonsumenDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default KonsumenDropdown;