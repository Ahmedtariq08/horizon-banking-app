import HeaderBox from "@/components/home/HeaderBox";
import RightSidebar from "@/components/home/right-sidebar/RightSidebar";
import TotalBalanceBox from "@/components/home/total-balance/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {
        firstName: "Ahmed",
        lastName: "Tariq",
        email: "ahmedtariq92331@gmail.com",
    };
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn.firstName || "Guest"}
                        subtext="Access and manage your account and transactions efficiently"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={500.43}
                    />
                </header>
                recent transactions
            </div>
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 1234.5 }, { currentBalance: 432.34 }]}
            />
        </section>
    );
};

export default Home;
