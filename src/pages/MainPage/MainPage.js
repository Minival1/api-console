import React from 'react';
import Header from "components/Header/Header";
import Console from "components/Console/Console";
import HistoryRequests from "components/HistoryRequests/HistoryRequests";

const MainPage = () => {
    return (
        <div>
            <Header/>
            <HistoryRequests/>
            <Console/>
        </div>
    );
};

export default MainPage;
