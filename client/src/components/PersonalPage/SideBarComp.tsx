import { ListGroup } from 'react-bootstrap';

export default function SideBarComp({ activeTab, setActiveTab }) {
const tabs = ['Мой профиль', 'Учетная запись', 'Мой план'];

  return (
    <ListGroup>
      {tabs.map((tab, index) => (
        <ListGroup.Item
          key={index}
          action
          active={activeTab === index}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
