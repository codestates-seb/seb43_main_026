package com.codestates.member.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member){

        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        Member returnMember = memberRepository.save(member);
        return returnMember;
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedmember(member.getMemberId());

        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        Optional.ofNullable(member.getEmail())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId){
        return findVerifiedmember(memberId);
    }

    public void deleteMember(long memberId){
        Member findMember = findVerifiedmember(memberId);

        memberRepository.delete(findMember);
    }

    private Member findVerifiedmember(Long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> optionalMember =
                memberRepository.findByEmail(email);
        if(optionalMember.isPresent()){
            throw new BusinessLogicException(ExceptionCode.EMAIL_CONFLICT);
        }
    }

    private void verifyExistsNickname(String nickname){
        Optional<Member> optionalMember =
                memberRepository.findByNickname(nickname);
        if(optionalMember.isPresent()){
            throw new BusinessLogicException(ExceptionCode.NICKNAME_CONFLICT);
        }
    }
}
