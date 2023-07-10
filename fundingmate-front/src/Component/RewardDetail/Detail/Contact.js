import React, { useEffect, useState } from "react";
import "../../../pages/Rewarddetail/Rewarddetail.css";
import Desc from "../Desc/Desc";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const [reward, setReward] = useState({
    id: 0,
    projName: "",
    projTargetAmount: 0,
    projDateStart: null,
    projDateEnd: null,
    deliveryDate: null,
    repFile: null,
    projKeyword: "",
    rewardVideoAddress: "",
    conFile: null,
    projContent: "",
    rewardRefundExchangePolicy: "",
    rewardContact: "",
    rewardEmail: "",
    rewardCategory: "",
    modelName: "",
    countryOfOrigin: "",
    manufacturer: "",
    rewardLaw: "",
    asPhoneNumber: "",
    businessImg: null,
    businessAddress: "",
    bank: "",
    accNumber: "",
    depositorName: "",
    bankImg: null,
    taxBillEmail: "",
    websiteUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    blogUrl: "",
    twitterUrl: "",
    user: null,
    rewardTypes: [],
  });
  const [rewardComment, setRewardComment] = useState({
    id: 0,
    comContent: "",
    comRegistrationDate: null,
    conRevisionDate: null,
    reward: null,
    user: null,
    replies: [],
  });
  const [viewDesc, setViewDesc] = useState(false);

  const { rewardId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/reward-detail/story/${rewardId}`)
      .then((res) => {
        console.log(res.data);
        setReward(res.data.reward);
        setViewDesc(true);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:8090/reward-detail/contact/${rewardId}`)
      .then((res) => {
        console.log(res.data);
        setRewardComment(res.data.rewardComment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderComments = () => {
    return rewardComment.replies.map((reply) => (
      <div className="reward_con_list" key={reply.id}>
        <div className="reward_con_name">
          {reply.user.userName} | {reply.comRegistrationDate}
        </div>
        <div className="reward_con_content">{reply.comContent}</div>
        <button className="del_sub">삭제</button>
      </div>
    ));
  };

  return (
    <div className="desc">
      {viewDesc && <Desc reward={reward} />}
      <div className="menu">
        <hr />
        <div className="menu_items">
          <Link className="story" to={`/reward-detail/story/${rewardId}`}>
            스토리
          </Link>
          <div className="contact_box">
            <Link className="contact active" to={"/reward-detail/contact"}>
              문의
            </Link>
            <div className="contact_count">0</div>
          </div>
          <Link className="guide" to={"/reward-detail/guide"}>
            안내
          </Link>
        </div>
      </div>
      <div className="con">
        <p className="con_subtitle">
          여러분들이 궁금한 모든 것들을 편하게 질문해주세요!!!
        </p>
        <p className="con_title">문의 작성 시 유의사항</p>
        <li className="con_info">
          리워드 관련 문의는 댓글에 달아주시면 정확한 답변을 받을 수 있습니다.
        </li>
        <textarea className="con_input" />
        <button type="submit" className="sub">
          문의하기
        </button>

        {/* <div className="con_list">등록된 문의가 없습니다.</div> */}

        {renderComments()}
      </div>
    </div>
  );
};

export default Contact;
