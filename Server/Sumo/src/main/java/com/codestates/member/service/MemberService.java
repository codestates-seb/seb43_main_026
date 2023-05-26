package com.codestates.member.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.jwt.auth.utils.CustomAuthorityUtils;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedmember(member.getMemberId());

        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

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
