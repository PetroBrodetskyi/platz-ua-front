import scss from './Tabs.module.scss';

const Tabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className={scss.tabsLineFlex}>
      <div className={scss.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.value} // Використовуйте value як унікальний ключ
            className={`${scss.tabDetails} ${activeTab === tab.value ? scss.active : ''}`}
            onClick={() => onTabChange(tab.value)}
          >
            <span className={scss.tabsTitle}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
