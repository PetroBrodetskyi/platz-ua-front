import scss from './Tabs.module.scss';

const Tabs = ({ activeTab, onTabChange }) => {
    return (
        <div className={scss.tabsLineFlex}>
            <div className={scss.tabsContainer}>
                <button
                    className={`${scss.tabDetails} ${activeTab === 'buyers' ? scss.active : ''}`}
                    onClick={() => onTabChange('buyers')}
                >
                    <span className={scss.tabsTitle}>покупцям</span>
                </button>
                <button
                    className={`${scss.tabReviews} ${activeTab === 'sellers' ? scss.active : ''}`}
                    onClick={() => onTabChange('sellers')}
                >
                    <span className={scss.tabsTitle}>продавцям</span>
                </button>
            </div>
        </div>
    );
};

export default Tabs;
