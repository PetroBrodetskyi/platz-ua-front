import scss from './Tabs.module.scss';

const Tabs = ({ activeTab, onTabChange }) => {
    return (
        <div className={scss.tabsLineFlex}>
            <div className={scss.tabsContainer}>
                <button
                    className={`${scss.tabDetails} ${activeTab === 'buyers' ? scss.active : ''}`}
                    onClick={() => onTabChange('buyers')}
                >
                    Покупцям
                </button>
                <button
                    className={`${scss.tabReviews} ${activeTab === 'sellers' ? scss.active : ''}`}
                    onClick={() => onTabChange('sellers')}
                >
                    Продавцям
                </button>
            </div>
        </div>
    );
};

export default Tabs;
