package com.fund.fundingmate.domain.reward.service;

import com.fund.fundingmate.domain.reward.dto.RewardCommentDTO;
import com.fund.fundingmate.domain.reward.dto.RewardDTO;
import com.fund.fundingmate.domain.reward.dto.RewardReplyDTO;
import com.fund.fundingmate.domain.reward.entity.Reward;
import com.fund.fundingmate.domain.reward.entity.RewardComment;
import com.fund.fundingmate.domain.reward.entity.RewardReply;
import com.fund.fundingmate.domain.reward.repository.RewardCommentRepository;
import com.fund.fundingmate.domain.reward.repository.RewardRepository;
import com.fund.fundingmate.domain.user.dto.UserDTO;
import com.fund.fundingmate.domain.user.entity.User;
import com.fund.fundingmate.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class RewardCommentService {
    private final RewardCommentRepository rewardCommentRepository;
    private final UserRepository userRepository;

    private final RewardRepository rewardRepository;

    @Autowired
    public RewardCommentService(RewardCommentRepository rewardCommentRepository, UserRepository userRepository, RewardRepository rewardRepository) {
        this.rewardCommentRepository = rewardCommentRepository;
        this.userRepository = userRepository;
        this.rewardRepository = rewardRepository;
    }

    public void insertRewardComment(RewardCommentDTO rewardCommentDTO) {
        RewardDTO rewardDTO = rewardCommentDTO.getReward();
        UserDTO userDTO = rewardCommentDTO.getUser();

        Reward reward = rewardRepository.findById(rewardDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("Reward not found with ID: " + rewardDTO.getId()));

        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userDTO.getId()));


        RewardComment rewardComment = new RewardComment();
        rewardComment.setComContent(rewardCommentDTO.getComContent());
        rewardComment.setComRegistrationDate(new Date());
        rewardComment.setComRevisionDate(new Date());
        rewardComment.setReward(reward);
        rewardComment.setUser(user);

        rewardCommentRepository.save(rewardComment);
    }

    public void insertRewardCommentReply(RewardReplyDTO rewardReplyDTO) {

    }
}
