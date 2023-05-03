package com.codestates.member.service;

import com.codestates.calendar.service.CalendarService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.jwt.helper.MemberRegistrationApplicationEvent;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.member.utils.CustomAuthorityUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final CalendarService calendarService;

    public MemberService(MemberRepository memberRepository,
                         ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils,
                         CalendarService calendarService) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.calendarService = calendarService;
    }

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());
        calendarService.initCalendar(member.getMemberId());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member returnMember = memberRepository.save(member);
        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, returnMember));
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
