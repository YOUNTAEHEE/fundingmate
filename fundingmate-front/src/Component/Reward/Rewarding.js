import React, { useEffect, useState } from "react";
import "../../pages/Reward/Reward.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Rewarding = () => {
  const [rewardingRewards, setRewardingRewards] = useState([]);
  const [visibleRewards, setVisibleRewards] = useState(4);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [paymentAmounts, setPaymentAmounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchRewardingRewards();
  }, []);

  useEffect(() => {
    fetchPaymentAmount();
  }, [rewardingRewards]);

  const fetchRewardingRewards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/reward/find/rewarding/more",
        {
          params: {
            startIndex: 0,
            endIndex: visibleRewards,
          },
        }
      );

      setRewardingRewards(response.data);
      setShowLoadMoreButton(response.data.length >= visibleRewards);
    } catch (error) {
      console.error("Error fetching rewarding rewards:", error);
    }
  };

  const fetchPaymentAmount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/payment/total-amount",
        {
          params: {
            rewardIds: rewardingRewards.map((reward) => reward.id).join(","),
          },
        }
      );
      setPaymentAmounts(response.data);
    } catch (error) {
      console.error("Error fetching payment amounts:", error);
    }
  };

  const loadMoreRewards = async () => {
    const nextVisibleRewards = visibleRewards + 4;
    try {
      const response = await axios.get(
        "http://localhost:8090/reward/find/rewarding/more",
        {
          params: {
            startIndex: visibleRewards,
            endIndex: nextVisibleRewards,
          },
        }
      );
      const nextRewards = response.data;
      setRewardingRewards((prevRewards) => [...prevRewards, ...nextRewards]);
      setVisibleRewards(nextVisibleRewards);
      setShowLoadMoreButton(nextRewards.length >= 4);
    } catch (error) {
      console.error("Error loading more rewards:", error);
    }
  };

  const handleRewardClick = (rewardId) => {
    navigate(`/reward-detail/story/${rewardId}`);
  };

  const numVisibleRewards = Math.min(visibleRewards, rewardingRewards.length);
  const visibleRewardCards = rewardingRewards.slice(0, numVisibleRewards);

  return (
    <div className="rewarding">
      <p className="reward_title">진행중인 리워드</p>
      <div className="rewarding_proj">
        펀딩메이트에서 핫한 프로젝트를 만나보세요
      </div>
      <div className="reward_cards">
        {visibleRewardCards.map((reward) => (
          <div
            className="reward_card"
            key={reward.id}
            onClick={() => handleRewardClick(reward.id)}
          >
            <img
              src={`http://localhost:8090/img/${reward.repFile.fileName}`}
              className="reward_img"
              alt={reward.projName}
            />
            <div className="com_name">{reward.manufacturer}</div>
            <div className="reward_name">{reward.projName}</div>
            <div className="reward_detail">
              <div className="price">
                {paymentAmounts[reward.id]?.toLocaleString() || "0"}원 펀딩
              </div>
              <div className="rate">
                {Math.floor(
                  (paymentAmounts[reward.id] / reward.projTargetAmount) * 100
                )}
                %
              </div>
              <div className="d_day">
                D-
                {Math.ceil(
                  (new Date(reward.projDateEnd) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showLoadMoreButton && (
        <button className="reward-more" onClick={loadMoreRewards}>
          리워드 프로젝트 더보기
        </button>
      )}
    </div>
  );
};

export default Rewarding;
